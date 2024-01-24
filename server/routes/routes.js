const express = require("express");
const services = require("../services/render");
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
  setUser,
  loginUser,
  getUser,
} = require("../controller/controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @description Root Route
 * @method GET/
 */
router.get("/", services.homeRoute);

/**
 * @description for add todo Route
 * @method GET/addtodo
 */
router.get("/addtodo", services.add_todo);

/**
 * @description profile Route
 * @method GET/profile
 */
router.get("/profile", services.profile);

/**
 * @description profile Route
 * @method GET/profile
 */
router.get("/logout", services.logout);

/**
 * @description for update todo Route
 * @method GET/updatetodo
 */
router.get("/updatetodo", services.update_todo);

// API /api/goals
router.get("/api/goals", getGoal);
router.post("/api/goals", setGoal);
router.put("/api/goals/:id", updateGoal);
router.delete("/api/goals/:id", deleteGoal);

// API /api/users
router.post("/api/users", setUser);
router.post("/api/users/login", loginUser);
router.get("/api/users/me", protect, getUser);

module.exports = router;
