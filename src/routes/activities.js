const { Router } = require("express");
const { getActivities, createActivity } = require("../controllers/activities");

const router = Router();

router.get("/", getActivities);
router.post("/", createActivity);

module.exports = router;
