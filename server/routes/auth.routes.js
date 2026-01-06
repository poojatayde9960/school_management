const { registerAdmin, loginAdmin, logoutAdmin, registerClerk, loginClark, logoutClark } = require("../controllers/auth.controller")
const { clarkProtected } = require("../middleware/Protected")

const router = require("express").Router()


router
    .post("/admin/register", registerAdmin)
    .post("/admin/login", loginAdmin)
    .post("/admin/logout", logoutAdmin)

    .post("/clark/register", registerClerk)
    .post("/clark/login", loginClark)
    .post("/clark/logout", logoutClark)
module.exports = router

