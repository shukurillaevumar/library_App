const express = require('express');
const router = express.Router();
const bookService = require("../service/books.service");


router.get("/all", (req, res)=> {
    res.json(bookService.getAll());
});

router.get("/:id", (req, res)=> {
    const {id} = req.params;
    res.json(bookService.getById(id));
})

router.post("/create", (req, res)=> {
    const validatedResult = bookService.validateCreateInputs(req.body);
    if(validatedResult.code === 200) {
       res.json(bookService.create(validatedResult.result));
    } else {
        res.status(validatedResult.status)
        res.json({ error: validatedResult.message })
    }
});

router.put("/edit/:id", (req, res)=> {
    const validationResult = bookService.validateUpdateInputs(req.body)
    const {id} = req.params;

    if (validationResult.status === 200 & id) {
        res.send(bookService.update(id, validationResult.result));
    } else {
        res.status(validationResult.status);
        res.json({ error: validationResult.message });
    }
});

router.delete("/delete/:id", (req, res)=> {
    const {id} = req.params;
    res.json(bookService.remove(id));
});

module.exports = router;