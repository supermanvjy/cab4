const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res) {
  const COUNTRIES_ENDPOINT =
    "https://countriesnow.space/api/v0.1/countries/capital";

  axios
    .get(COUNTRIES_ENDPOINT)
    .then((response) => {
      const { data } = response;
      const allCountries = data.data;

      res.render("index", { data: allCountries });
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
});

module.exports = router;