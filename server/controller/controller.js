const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

/**
 * @description Get Goals
 * @method GET /api/goals
 * @acess Private
 */
const getGoal = asyncHandler(async (req, res) => {
  if (req.query.id) {
    const queryParamater = req.query.id;
    const singleGoal = await Goal.findById(queryParamater);
    if (!queryParamater) {
      res.status(400);
      throw new Error("No goal with the id" + req.query.id);
    } else {
      res.status(200).send(singleGoal);
    }
  } else {
    const find = await Goal.find();

    res.status(200).send(find);
  }
});

/**
 * @description POST Goals
 * @method POST /api/goals
 * @acess Private
 */
const setGoal = asyncHandler(async (req, res) => {
  // validate request
  if (!req.body.goal || !req.body.msg) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  // create Goal
  await Goal.create({
    goal: req.body.goal,
    msg: req.body.msg,
  });

  setTimeout(() => {
    res.redirect("/addtodo");
  }, 2100);
});

/**
 * @description PUT Goals
 * @method PUT /api/goals/:id
 * @acess Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  // find goal
  const find = await Goal.findById(req.params.id);

  // validate request
  if (!find) {
    res.status(400);
    throw new Error("Can not find the goal of the id " + req.params.id);
  }

  // Update goal
  const updGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updGoal);
});

/**
 * @description DELETE Goals
 * @method DELETE /api/goals/:id
 * @acess Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  // find goal
  const find = await Goal.findById(req.params.id);

  // validate request
  if (!find) {
    res.status(400);
    throw new Error("Can not find the goal of the id " + req.params.id);
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    msg: `User was deleted successfully with the id: ${req.params.id}`,
  });
});

/**
 * @description Register new user
 * @method POST /api/users
 * @acess Public
 */
const setUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate post
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Pleass add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  // validate email
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genereteToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalided user data");
  }
});

/**
 * @description Authenticate a user
 * @method POST /api/users/login
 * @acess Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genereteToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @description GET user data
 * @method GET /api/users/me
 * @acess Public
 */
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generete JTW
const genereteToken = (id) => {
  return jwt.sign({ id }, process.env.JTW_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
  setUser,
  loginUser,
  getUser,
};
