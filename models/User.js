const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: { type: "string" },
  username: {
    type: "string",
    required: true,
  },
  email: {
    unique: true,
    type: String,

    validate: {
      validator: function (str) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "owner", "guest"],
    default: "guest",
  },

  notifications: {
    type: Array,
    default: [],
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/duax5havz/image/upload/v1675608212/istockphoto-1131164548-612x612_tta6jg.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    default: "Male",
  },
  age: {
    type: String,
    default: "18",
  },
  phone: {
    type: Number,
    default: "123",
  },
  address: {
    type: String,
    default: "123",
  },
});

module.exports = mongoose.model("users", UserSchema);
