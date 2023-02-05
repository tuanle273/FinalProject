const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "is required"],
    validate: {
      validator: function (str) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  password: {
    type: String,
    required: [true, "is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  cart: {
    type: Object,
    default: {
      total: 0,
      count: 0,
    },
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
});

module.exports = mongoose.model("users", UserSchema);
