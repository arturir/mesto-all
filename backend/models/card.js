const mongoose = require("mongoose");
const regExpUrl = require("../regexp/url");
const User = require("./user");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regExpUrl.test(v),
      message: () => "Указан неправильный URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: User,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
