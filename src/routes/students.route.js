const express = require("express");
const router = express.Router();
const studentsService = require("../service/students.service")

router.get("/", (req, res) => {
    res.json(studentsService.getStudents());
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    res.json(studentsService.getStudentsById(id));
});

router.post("/", (req, res) => {
    const validatedData = studentsService.validateCreateInput(req.body);
    res.json(studentsService.createStudent(validatedData));
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    res.json("update student: " + id);
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.json("delete student: " + id);
});

module.exports = router;