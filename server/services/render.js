const axios = require("axios");

exports.homeRoute = (req, res) => {
  // Make a get request to /api/goal
  axios
    .get("https://to-do-app-qa3t.onrender.com/api/goals")
    .then((response) => {
      res.render("index", { goals: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_todo = (req, res) => {
  res.render("postGoal");
};

exports.profile = (req, res) => {
  res.render("login");
};

exports.logout = (req, res) => {
  res.render("logout");
};

exports.update_todo = (req, res) => {
  // Make a get request to /api/goal
  axios
    .get("https://to-do-app-qa3t.onrender.com/api/goals", {
      params: { id: req.query.id },
    })
    .then((goaldata) => {
      res.render("updateGoal", { id: goaldata.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
