const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Person = require('../models/person');
const Partner = require('../models/partner');
const Father = require('../models/father');
const Mother = require('../models/mother');
const toId = mongoose.Types.ObjectId;

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

const addUserDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  let detail;
  try {
    detail = await Person.find({ 'userId': req.userData.userId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  // Add this from User table
  // if (detail.creator.toString() !== userId) {
  //  const error = new HttpError('You are not allowed to edit this place.', 401);
  //  return next(error);
  // }

  let exist;
  exist = await User.find({ "_id": req.userData.userId });
  let dbValue = exist[0];
  if (!dbValue[req.body.type]) {
    console.log("Create Value");
    let createPerson;
    let newBody = {
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      gotra: req.body.gotra,
      maiden_first_name: req.body.maiden_first_name,
      maiden_middle_name: req.body.maiden_middle_name,
      maiden_last_name: req.body.maiden_last_name,
      maiden_city: req.body.maiden_city,
      alive: req.body.alive,
      date_of_death: req.body.date_of_death,
      marital_status: req.body.marital_status,
      father_alive: req.body.father_alive,
      father_death: req.body.father_death,
      mother_alive: req.body.mother_alive,
      mother_death: req.body.mother_death,
      blood_group: req.body.blood_group,
      birth_date: req.body.birth_date,
      education: req.body.education,
      education_detail: req.body.education_detail,
      occupation: req.body.occupation,
      occupation_detail: req.body.occupation_detail,
      earning: req.body.earning,
      address: req.body.address,
      address_city: req.body.address_city,
      address_pincode: req.body.address_pincode,
      address_ward: req.body.address_ward,
      permanent_address: req.body.permanent_address,
      permanent_city: req.body.permanent_city,
      permanent_pincode: req.body.permanent_pincode,
      personal_number: req.body.personal_number,
      whatsapp_number: req.body.whatsapp_number,
      email: req.body.email,
      userId: req.userData.userId,
      creator: req.userData.userId
    }
    if (req.body.type === "personal") {
      createPerson = new Person(newBody)
    }
    if (req.body.type === "partner") {
      createPerson = new Partner(newBody)
    }
    if (req.body.type === "father") {
      createPerson = new Father(newBody)
    } if (req.body.type === "mother") {
      createPerson = new Mother(newBody)
    }

    let user;
    try {
      user = await User.findById(req.userData.userId);
    } catch (err) {
      const error = new HttpError(
        'Creating place failed, please try again.',
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError('Could not find user for provided id.', 404);
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createPerson.save({ session: sess });
      console.log(req.body.type);
      if (req.body.type == "personal") {
        user.personal = createPerson;
      }
      if (req.body.type == "partner") {
        user.partner = createPerson;
      }
      if (req.body.type == "father") {
        user.father = createPerson;
      }
      if (req.body.type == "mother") {
        user.mother = createPerson;
      }
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err)
      const error = new HttpError(
        'Adding data failed, please try again.',
        500
      );
      return next(error);
    }
    res
      .status(201)
      .json("Data Added successfully ");
  } else {
    console.log("Update Value");
    let updateDetails = {
      first_name: req.body.first_name || "",
      middle_name: req.body.middle_name || "",
      last_name: req.body.last_name || "",
      gender: req.body.gender || "",
      gotra: req.body.gotra || "",
      maiden_first_name: req.body.maiden_first_name || "",
      maiden_middle_name: req.body.maiden_middle_name || "",
      maiden_last_name: req.body.maiden_last_name || "",
      maiden_city: req.body.maiden_city || "",
      alive: req.body.alive || "",
      date_of_death: req.body.date_of_death || "",
      marital_status: req.body.marital_status || "",
      father_alive: req.body.father_alive || "",
      father_death: req.body.father_death || "",
      mother_alive: req.body.mother_alive || "",
      mother_death: req.body.mother_death || "",
      blood_group: req.body.blood_group || "",
      birth_date: req.body.birth_date || "",
      education: req.body.education || "",
      education_detail: req.body.education_detail || "",
      occupation: req.body.occupation || "",
      occupation_detail: req.body.occupation_detail || "",
      earning: req.body.earning || "",
      address: req.body.address || "",
      address_city: req.body.address_city || "",
      address_pincode: req.body.address_pincode || "",
      address_ward: req.body.address_ward || "",
      permanent_address: req.body.permanent_address || "",
      permanent_city: req.body.permanent_city || "",
      permanent_pincode: req.body.permanent_pincode || "",
      personal_number: req.body.personal_number || "",
      whatsapp_number: req.body.whatsapp_number || "",
      email: req.body.email || ""
    }

    let father ={
      father:"60fc285c9db34e122ccab85uyjgjd"
    }

    let place;
    try {
      if (req.body.type === "personal") {
        console.log("her111")
        // place = await Person.findOneAndUpdate({ "userId": req.userData.userId }, updateDetails);
        let fat = toId("60fa702c87014480150594ec");
        // place = await Person.find({ "userId": req.userData.userId });
        // place.father = fat
        // place.save();

        console.log(fat);
        place = await User.findOneAndUpdate( {"_id": req.userData.userId }, {father:fat});
        console.log(place)
      }
      if (req.body.type === "partner") {
        place = await Partner.findOneAndUpdate({ "userId": req.userData.userId }, updateDetails);
      }
      if (req.body.type === "father") {
        place = await Father.findOneAndUpdate({ "userId": req.userData.userId }, updateDetails);
      }
      if (req.body.type === "mother") {
        place = await Mother.findOneAndUpdate({ "userId": req.userData.userId }, updateDetails);
      }
    } catch (err) {
      console.log(err)
      const error = new HttpError(
        'Something went wrong, could not update place.',
        500
      );
      return next(error);
    }
    res
      .status(201)
      .json("Data Updated successfully ");
  }
}



const getUserDetails = async (req, res, next) => {
  let detail;

  try {
    if (req.params.detailsType === "personal") {
      detail = await Person.find({ userId: req.userData.userId });
    }
    if (req.params.detailsType === "partner") {
      detail = await Partner.find({ userId: req.userData.userId });
    } if (req.params.detailsType === "mother") {
      detail = await Mother.find({ userId: req.userData.userId });
    } if (req.params.detailsType === "father") {
      detail = await Father.find({ userId: req.userData.userId });
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }


  if (!detail) {
    const error = new HttpError(
      'Could not find detail for the provided id.',
      404
    );
    return next(error);
  }

  res.status(200).json({ detail: detail[0], type: req.params.detailsType || "" });
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.addUserDetails = addUserDetails;
exports.getUserDetails = getUserDetails;
