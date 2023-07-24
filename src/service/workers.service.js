const workers = require("../db/workers.db");

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

module.exports = {
    getWorkers,
    getWorkerById
}