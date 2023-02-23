const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  studentsList: Array,
  edit: Boolean
});

const ClassesModel = mongoose.model("classes", UserSchema);
module.exports = ClassesModel;