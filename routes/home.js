const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/home", function (req, res) {
  res.render("home", { title: "Cara" });
});

module.exports = router;
