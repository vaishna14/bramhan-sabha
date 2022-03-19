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
const user = require('../models/user');
const Female = require('../models/female');
const Male = require('../models/male');
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
      process.env.JWT_TOKEN,
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
      process.env.JWT_TOKEN,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }
  console.log("--------------------------");
  console.log(existingUser.isAdmin)
  // console.log(existingUser)
  console.log(existingUser.id);
  console.log(existingUser.name);
  console.log("--------------------------");


  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    isAdmin: existingUser.isAdmin,
    formId: existingUser.formId,
    adminArea: existingUser.adminArea,

  });
};

const getUserCount = async () => {
  let val = await User.find()
  let returnCount = Object.entries(val).length + 1;
  return returnCount;
}

const getFormId = async (type, reqFormId, kidCount, exist, userData) => {
  let abc;
  console.log(type);
  if (exist !== "" && type !== "kids" && type !== "kids_spouse") {
    console.log("here");
    console.log(exist !== "");
    console.log(type !== "kids");
    console.log(type !== "kids_spouse")
    console.log(exist !== "" && (type !== "kids" || type !== "kids_spouse"))
    console.log("here");

    place = await User.findOneAndUpdate({ "_id": userData }, { [type]: toId(exist), "approve": false });
  }
  if (type == "personal") {
    abc = reqFormId + "/1"
  }
  if (type == "partner") {
    abc = reqFormId + "/2"
  }
  if (type == "father") {
    abc = reqFormId + "/3"
  }
  if (type == "mother") {
    abc = reqFormId + "/4"
  }
  if (type == "kids" || type == "kids_spouse") {
    console.log("there");

    let childCount = kidCount;
    if (!kidCount) {
      let userVal
      userVal = await User.find({ "_id": toId(userData) });
      console.log(userData)
      console.log(userVal);
      childCount = (userVal[0].kids).length + 1;
    }
    abc = reqFormId + "/1/" +childCount;
  }
  return abc;
}

const getCreatePerson = async (gender, type, newBody) => {
  let createPerson;
  if (gender === "F" || type == "mother") {
    createPerson = await new Female(newBody)
  }
  if (gender === "M" || type == "father") {
    createPerson = await new Male(newBody)
  }
  return createPerson;
}

const addNewUser = async (req, user) => {
  console.log("Does not exist");
        let abc;
        let reqFormId;
        let reqType = req.body.type
        if (!req.body.formId) {
          reqFormId =  await getUserCount()
        }else{
          reqFormId = req.body.formId;
        }
        abc = await getFormId(reqType, reqFormId, req.body?.kidCount,req.body?.isExist, req.userData.userId);
        let createPerson;
        console.log(abc);
        let newBody = {
          ...req.body,
          approve: false,
          userId: req.userData.userId,
          creator: req.userData.userId,
          formId: abc,
        }
        user = await User.findById(req.userData.userId);
        createPerson = await getCreatePerson(req.body.gender, reqType, newBody)
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createPerson.save({ session: sess });
        if (reqType == ("kids")) {
          console.log("includes kids")
          console.log(user.kids);
          user.kids.push(createPerson);
          console.log(user.kids);
        }

        // If the new data is for kids partner 
          else if (reqType == "kids_spouse") {
          if (req.body.gender === "F" || reqType == "mother") {
            console.log("Here")
            place = await Male.findById(req.body.kidId);
            place["partnerId"] = createPerson;
          }
          if (req.body.gender === "M" || reqType == "father") {
            place = await Female.findById(req.body.kidId);
            place["partnerId"] = createPerson;
          }
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            console.log(place);
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        await place.save({ session: sess });
        }
        else {
          user[reqType] = createPerson;
        }
        await user.save({ session: sess });
        await sess.commitTransaction();
}

const updateExistingUser = async (req, res, next) => {
  console.log("Update Value");
    var abc;
    console.log(req.body.type);
    let reqFormId ;
    if(req.body.formId){
      reqFormId = req.body.formId;
    } else {
      reqFormId = await getUserCount();
    }
    abc = await getFormId(req.body.type, reqFormId, req.body?.kidCount,req.body?.isExist)
    // if (req.body.type == "personal") {
    //   abc = reqFormId + "/1"
    // }
    // if (req.body.type == "partner") {
    //   abc = reqFormId + "/2"
    // }
    // if (req.body.type == "father") {
    //   abc = reqFormId + "/3"
    // }
    // if (req.body.type == "mother") {
    //   abc = reqFormId + "/4"
    // }
    // if (req.body.type == "kids") {
    //   var childCount = req.body.kidCount;
    //   console.log(childCount);
    //   abc = reqFormId + "/1/" + childCount
    // }
    let updateDetails = {
      ...req.body,
      approve: false,
      email: req.body.email || "",
      formId: abc,
    }

    let place;
    try {
      // if (req.body.type === "personal") {
        if (req.body.isExist !== "") {
          console.log("Does exist");
          let type = req.body.type;
          if (type == "kids" || type == "kids_spouse") {
            place = await User.find({ "_id": req.userData.userId });
          }else {
              place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { [req.body.type]: toId(req.body.isExist), "approve": false });
              user2 = await User.findOne({ "_id": req.userData.userId });
            }
          if (req.body.gender == "M") {
            let checkPartner = await Male.findOne({ "_id": user2[req.body.type] });
            if (!checkPartner) {
              return;
            } else {
              updateValue = await Male.findOneAndUpdate({ "_id": user2[req.body.type] }, updateDetails);
            }
          }
          if (req.body.gender == "F") {
            let reqType = req.body.type;
            let checkPartner = await Female.findOne({ "_id": user2[req.body.type] });
            if (!checkPartner) {
              return;
            } else {
              updateValue = await Female.findOneAndUpdate({ "_id": user2[req.body.type] }, updateDetails);
            }
          }
        } else {
          user2 = await User.findOne({ "_id": req.userData.userId });
          updateUser = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "approve": false })
          let checkPartner = await Male.findOne({ "_id": user2[req.body.type] });
          if (!checkPartner) {
            updateValue = await Female.findOneAndUpdate({ "_id": user2[req.body.type] }, updateDetails);
          } else {
            updateValue = await Male.findOneAndUpdate({ "_id": user2[req.body.type] }, updateDetails);
          }
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

const addDbUser = async () => {
  
}

const addUserDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  let exist;
  exist = await User.find({ "_id": req.userData.userId });
  let dbValue = exist[0];
  if (!dbValue[req.body.type] || (req.body.type == "kids" && !req.body.kidId )) {
    console.log("Create Value");
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
      if (req.body.isExist === "") {
        await addNewUser(req, user)
      }
      else {
        console.log("Already exist");
        let abc;
        let reqFormId;
        let reqType = req.body.type;
        if(req.body.formId){
          reqFormId = req.body.formId;
        } else {
          reqFormId = await getUserCount();
          console.log("reqFormId" + reqFormId);
        }
        console.log(req.body.type);
        console.log(reqType);
        abc = await getFormId(reqType, reqFormId, req.body?.kidCount,req.body?.isExist, req.userData.userId);

        // if (req.body.type == "personal") {
        //   place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "personal": toId(req.body.isExist), "approve": false });
        //  console.log(reqFormId);
        //   abc = reqFormId + "/1"
        // }
        // if (req.body.type == "partner") {
        //   place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "partner": toId(req.body.isExist) });
        //   abc = reqFormId + "/2"
        // }
        // if (req.body.type == "father") {
        //   place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "father": toId(req.body.isExist) });
        //   abc = reqFormId + "/3"
        // }
        // if (req.body.type == "mother") {
        //   place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "mother": toId(req.body.isExist) });
        //   abc = reqFormId + "/4"
        // }
        
        // if (reqType.includes("kids")) {
        //   console.log("includes kids")
        //   // user.kids.push(createPerson);
        //   // place = await User.findOneAndUpdate({ "_id": req.userData.userId }, { "kids": toId(req.body.isExist) });
        //   place = await User.find({ "_id": req.userData.userId });
        // }
        let user = await User.findById(req.userData.userId);

        let checkPartner = await Male.findOne({ "_id": req.body.isExist });
        console.log("-------------------------------checkPartner-------------------------------");
        console.log(user);
        console.log("-------------------------------checkPartner-------------------------------");

        if (!checkPartner) {
          let checkPartner = await Female.findOne({ "_id": req.body.isExist });
          console.log("checkPartner Female");
          console.log((checkPartner));
          console.log("checkPartner Female");
          updateValue = await Female.findOneAndUpdate({ "_id": req.body.isExist }, { formId: abc });
          console.log(updateValue);
          return;
        } else {
          updateValue = await Male.findOneAndUpdate({ "_id": req.body.isExist }, { formId: abc });
          
          
          if (reqType == "kids") {
            let kuds = user.kids;
            console.log("kuds");
            console.log(kuds);
            console.log("kuds");
            kuds.push(req.body.isExist);
            console.log(kuds);
            await User.findOneAndUpdate({ "_id": req.userData.userId }, { kids: kuds });
            console.log(await User.findById(req.userData.userId));
            // console.log("nuser")
            // console.log(user);
            // console.log("nuser")
            // const sess = await mongoose.startSession();
            // sess.startTransaction();
            // await updateValue.save({ session: sess });
            //   console.log("includes kids")
            //   console.log(user.kids);
            //   user.kids.push(updateValue);
            //   console.log(user.kids);
            // await user.save({ session: sess });
            // await sess.commitTransaction();
              }
        }
        console.log(user);

      }
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
    await updateExistingUser(req, res, next);
  }
}

const getUserKids = async (req, res, next) => {
  try {
    userVal = await User.find({ "_id": toId(req.userData.userId) });
    kids = userVal[0].kids;
    console.log(kids);
    const kidsListMale = await Male.find().where('_id').in(kids).exec();
    const kidsListFemale = await Female.find().where('_id').in(kids).exec();
    res.status(200).json({ kidCount: kids, kidsListMale: kidsListMale, kidsListFemale: kidsListFemale });
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }


  if (!kids) {
    const error = new HttpError(
      'Could not find detail for the provided id.',
      404
    );
    return next(error);
  }

}


const getUserDetails = async (req, res, next) => {
  let detail;
  console.log("getUserDetails")
  try {
    userVal = await User.find({ "_id": toId(req.userData.userId) });
    var type = req.params.detailsType;
    var findId;
    if (type === "kids") {
      findId = req.params.childId
    }
    else if (type === "kids_spouse") {
      console.log("kids_spouse");
      let childId = req.params.childId
      console.log(req.params.childId);
      let child;
      child = await Male.find({ "_id": toId(childId) })
      if(child.length >0){
        findId = child[0].partnerId
      }else{
        child = await Female.find({ "_id": toId(childId) });
        findId = child[0].partnerId;
      }

    }
    else {
      findId = userVal[0][type];
    }
    detail = await Male.find({ "_id": toId(findId) });
    if (detail.length === 0) {
      detail = await Female.find({ "_id": toId(findId) });
    }

  } catch (err) {
    console.log(err)
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

const getSuggestions = async (req, res, next) => {
  let arr = [];
  console.log("here");
  try {
    male = Male.find({}).select("first_name middle_name last_name gotra education_detail occupation_detail address_ward");
    male.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ list: someValue });
    });
  } catch (err) {
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}

const getSuggestionsFemale = async (req, res, next) => {
  let arr = [];
  console.log("here");
  console.log("getSuggestionsFemale");
  try {
    female = Female.find({}).select("first_name middle_name last_name gotra education_detail occupation_detail address_ward");
    female.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ list: someValue });
    });
  } catch (err) {
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}

const getApprovals = async (req, res, next) => {
  try {
    let arr = [];
    male = Male.find({}).select("first_name middle_name last_name address_ward approve approveTime personal_number");
    male.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ list: someValue });
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}


const getApprovalsFemale = async (req, res, next) => {
  try {
    let arr = [];
    female = Female.find({}).select("first_name middle_name last_name address_ward approve approveTime personal_number");
    female.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ femalelist: someValue });
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}


const getAll = async (req, res, next)=>{
  try {
    let arr = [];
    male = Male.find({}).select("first_name middle_name last_name gender address_ward whatsapp_number education_detail blood_group birth_date occupation occupation_detail address_pincode");
    male.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ list: someValue });
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}

const getAllFemale = async (req, res, next)=>{
  try {
    let arr = [];
    console.log(req.body.key);
    let sel = String(req.body.key);
    console.log(sel)
    male = Female.find({}).select(sel);
    male.exec(function (err, someValue) {
      if (err) return next(err);
      arr = someValue
      res.status(200).json({ list: someValue });
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'No data found.',
      500
    );
    return next(error);
  }
}

// const getApprovalsList = async (req, res, next) => {
//   try {
//     userVal = await User.find({ "_id": toId(req.userData.userId) });
//     console.log(req.body)
//     kids = req.body.requestUser;
//     console.log(kids);
//     const kidsListMale = await Male.find().where('_id').in(kids).exec();
//     res.status(200).json({ approvalList: kidsListMale });
//     // res.status(200).json({ list: male });

//     // res.status(200).json("pulled");
//   } catch (err) {
//     console.log(err);
//     const error = new HttpError(
//       'No data found.',
//       500
//     );
//     return next(error);
//   }
// }


const getShowDetails = async (req, res, next) => {
  const findId = req.params.id;
  let detail;
  try {
    detail = await Male.find({ "_id": toId(findId) });
    if (detail.length === 0) {
      detail = await Female.find({ "_id": toId(findId) });
    }

  } catch (err) {
    console.log(err)
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

  res.status(200).json({ detail: detail[0] });

}


const approveUser = async (req, res, next) => {
  let detail;
  const findId = req.params.id;
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  try {
    detail = await Male.find({ "_id": toId(findId) });

    if (detail.length === 0) {
      detail = await Female.findOneAndUpdate({ "_id": toId(findId) }, { approve: true, approveTime: datetime });

    } else {
      detail = await Male.findOneAndUpdate({ "_id": toId(findId) }, { approve: true, approveTime: datetime });
    }

  } catch (err) {
    console.log(err)
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

  res.status(200).json("Successfully approved the user");

}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.addUserDetails = addUserDetails;
exports.getUserDetails = getUserDetails;
exports.getSuggestions = getSuggestions;
exports.getUserKids = getUserKids;
exports.getApprovals = getApprovals;
exports.getApprovalsFemale = getApprovalsFemale;
exports.getShowDetails = getShowDetails;
exports.approveUser = approveUser;
exports.getSuggestionsFemale = getSuggestionsFemale;
exports.getAll = getAll;
exports.getAllFemale = getAllFemale;

