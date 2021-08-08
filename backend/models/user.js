const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  isAdmin:{type: String},
  places: [{ type: mongoose.Types.ObjectId, ref: 'Place' }],
  kids: [{ type: mongoose.Types.ObjectId, ref: 'Place' }],
  personal:{ type: mongoose.Types.ObjectId,  ref: 'Person' },
  partner:{ type: mongoose.Types.ObjectId, ref: 'Partner' },
  father:{ type: mongoose.Types.ObjectId, ref: 'Father' },
  mother:{ type: mongoose.Types.ObjectId, ref: 'Mother' },
  approve:{type:Boolean},
  approveTime:{type:Date},
  formId:{type:String},
  adminArea:{type:String},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
