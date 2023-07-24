const express = require('express');
const router = express.Router();
const workersService = require("../service/workers.service");

router.get("/", (req, res) => {
    res.json(workersService.getWorkers());
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json(workersService.getWorkerById(id));
})

module.exports = router;