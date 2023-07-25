const workers = require("../db/workers.db");
const { v4: uuidv4 } = require('uuid');
function getWorkers () {
    return workers
}

function getWorkerById (id) {
    const index = workers.findIndex((worker) => {
        return worker.id === id;
    });

    if (index === -1) {
        throw new Error("Worker is not found");
    } else {
        return {
            status: "Success",
            worker: workers[index]
        }
    }
}

function createWorker (newWorker) {
    workers.push(newWorker);
    return {
        status: "Success",
        worker: newWorker
    }
}

function updateWorker (params) {
    const index = workers.findIndex((worker) => {
        return worker.id === params.workerId
    });

    if(index === -1) throw new Error("Worker data is not found");

    const updatedWorker = { ...workers[index], ...params.updateData};
    workers[index] = updatedWorker;
    return {
        status: "Success",
        worker: updatedWorker
    }
}

const removeWorker = (id) => {
    const index = workers.findIndex((worker) => {
        return worker.id === id;
    });

    if(index === -1) {
        throw new Error("Worker is not defined")
    }

    const deleteWr = workers.splice(index, 1);

    return {
        status: "Succes",
        worker: deleteWr
    }
}

const validateCreateInput = ({name, age, role, email}) => {
    const newWorker = {};
    newWorker.id = uuidv4();
    if(!name) throw new Error('name field is not defined');
    newWorker.name = name;
    if(!age) throw new Error('age field is not defined');
    newWorker.age = age;
    if(!role) throw new Error('role field is not defined')
    newWorker.role = role;
    if(!email) throw new Error('email field is not defined');
    newWorker.email = email;

    return newWorker;
}

const validateUpdateInput = ({ name, age, role, email }) => {
    const res = {};
    if(name) res.name = name;
    if(age) res.age = age;
    if(role) res.role = role;
    if(email) res.email = email;

    if(Object.keys(res).length === 0) {
        throw new Error("At least one field should be filled");
    } else {
        return res;
    }
}

module.exports = {
    getWorkers,
    getWorkerById,
    createWorker,
    validateCreateInput,
    updateWorker,
    removeWorker,
    validateUpdateInput
}