const express = require('express');
const router = express.Router();
const workersService = require("../service/workers.service");

router.get("/", (req, res) => {
    res.json(workersService.getWorkers());
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json(workersService.getWorkerById(id));
});

router.post("/", (req, res) => {
    const validatedData = workersService.validateCreateInput(req.body);
    res.json(workersService.createWorker(validatedData));
});

router.put("/:id", (req, res) => {
    const { id } = req.params;

    const validatedData = workersService.validateUpdateInput(req.body);

    res.json(workersService.updateWorker({ workerId: id, updateData: validatedData }));
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json(workersService.removeWorker(id));
});

module.exports = router;