const { Router } = require("express");
const { getCountries, getSingleCountry } = require("../controllers/countries");

const router = Router();

router.get("/", getCountries);
router.get("/:id", getSingleCountry);
// router.get();

module.exports = router;
