const STUDENTS = require("../db/students.db");
const { param } = require("../routes/books.route");
const { v4: uuidv4 } = require('uuid');
function getStudents () {
    return STUDENTS;
}

function getStudentsById (id) {
    const index = STUDENTS.findIndex((student) => {
        return student.id === id;
    });

    if(index === -1) {
        throw new Error("Student is not defined");
    } else {
        return {
           status: "Success",
           student: STUDENTS[index]
        };
    }
}

function createStudent (newStudent) {
    STUDENTS.push(newStudent);
    return {
        status: "Success",
        student: newStudent
    }
}

function updateStudent (params) {
    return;
}

function removeStudent (id) {
    return;
}

function validateCreateInput (params) {
    const newStudent = {};
    newStudent.id = uuidv4();
    const {name, age, group, email} = params;
    if(!name) {
        throw new Error("name field is not defined")
    }
    newStudent.name = name;
    if(!age) {
        throw new Error("age field is not defined")
    }
    newStudent.age = age;
    if(!group) {
        throw new Error("group field is not defined")
    }
    newStudent.group = group;
    if(!email) {
        throw new Error("email field is not defined")
    }
    newStudent.email = email;

    newStudent.blocked = false;
    newStudent.taken = [];
    newStudent.returned = [];
    return newStudent;
}

module.exports = {
    getStudents,
    getStudentsById,
    createStudent,
    updateStudent,
    removeStudent,
    validateCreateInput
}