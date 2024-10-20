const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api.js");

router.use("/tasks", taskApi);
router.use("/user", userApi);

module.exports = router;
