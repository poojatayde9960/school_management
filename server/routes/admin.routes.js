const { addTeacher, fetchTeacher, addDepartment, fetchDepartment, updateDepartment, deleteDepatment, addEvent, fetchEvent, deleteEvent, addStudent, updateEvent, fetchStudent, updateStudent, addFacilities, updateFacilities, fetchFacilities, deleteFacilities, deleteTeacher, deleteStudent } = require("../controllers/admin.controller")
// const { clarkProtected } = require("../middleware/Protected")

const router = require("express").Router()


router
    .post("/addTeacher", addTeacher)
    .delete("/delete-teacher/:id", deleteTeacher)

    .post("/addFacilities", addFacilities)
    .post("/addStudent", addStudent)
    .get("/getStudent", fetchStudent)
    .post("/addEvent", addEvent)
    .get("/fetchTeacher", fetchTeacher)
    .get("/fetchEvent", fetchEvent)
    .get("/fetchDepartment", fetchDepartment)
    .get("/fetchFacilities", fetchFacilities)
    .post("/addDepartment", addDepartment)
    .put("/updateDepartment/:id", updateDepartment)
    .put("/updateFacilities/:id", updateFacilities)
    .put("/updateStudent/:id", updateStudent)
    .put("/updateEvent/:id", updateEvent)
    .delete("/deleteDepartment/:id", deleteDepatment)
    .delete("/deleteEvent/:id", deleteEvent)
    .delete("/deleteFacilities/:id", deleteFacilities)
    .delete("/deleteStudent/:id", deleteStudent)

module.exports = router