const router = require("express").Router()
const applicationController = require("../controllers/application.controller")

router.post("/add-application", applicationController.addApplication)
router.get("/get-application", applicationController.getApplications)

module.exports = router
