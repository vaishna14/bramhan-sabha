const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const maleSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String,  required: true},
  gender: { type: String },
  gotra: { type: String },
  maiden_first_name: { type: String },
  maiden_middle_name: { type: String },
  maiden_last_name: { type: String },
  maiden_city: { type: String },
  alive: { type: String },
  date_of_marriage: { type: String },
  date_of_death: { type: String },
  marital_status: { type: String },
  father_alive: { type: String },
  father_death: { type: String },
  mother_alive: { type: String },
  mother_death: { type: String },
  blood_group: { type: String },
  birth_date: { type: String },
  education: { type: String },
  education_detail: { type: String },
  occupation: { type: String },
  occupation_detail: { type: String },
  earning: { type: String },
  address: { type: String },
  address_city: { type: String },
  address_pincode: { type: String },
  address_ward: { type: String },
  permanent_address: { type: String },
  permanent_city: { type: String },
  permanent_pincode: { type: String },
  personal_number: { type: String },
  whatsapp_number: { type: String },
  email: { type: String },
  userId:{type: String},
  approve:{type:Boolean},
  approveTime:{type:String},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Male', maleSchema);