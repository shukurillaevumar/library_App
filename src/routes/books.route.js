const express = require('express');
const router = express.Router();

const library = [
    {
        "id": "1",
        "name": "Muhammadumar",
        "author": "Muhammadumar",
        "year": "1999"
    },
    {
        "id": "2",
        "name": "Muhammadumar",
        "author": "Muhammadumar",
        "year": "2000"
    },
    {
        "id": "3",
        "name": "Muhammadumar",
        "author": "Muhammadumar",
        "year": "2001"
    }
];

router.get("/all", (req, res)=> {
    res.json(library);
});

router.get("/:id", (req, res)=> {
    const {id} = req.params;
    const index = library.findIndex((book)=> {
        return book.id === id;
    });

    if(index === -1) {
        res.json({
            error: "Book has not been found"
        });
    } else {
        res.json({
            result: "Book has been successfully found",
            book: library[index]
        });
    }
})

router.post("/create", (req, res)=> {
    const validationResult = validateCreateBookPayload(req.body);
    if(validationResult.code === 201) {
        const newBook = req.body;
        library.push(newBook);
        res.json({
            result: "New book has been successfully added",
            book: newBook
        });
    } else if (validationResult.code === 404) {
        res.json({
            error: validationResult.error,
            code: validationResult.code
        })
    }
});

router.put("/edit/:id", (req, res)=> {
    const validationResult = validateUpdateInputs(req.body)
    const {id} = req.params;
    if(validationResult.status === 200 && id) {
        const index = library.findIndex((book)=> {
        return book.id === id;
    });
    if(index === -1) {
        res.json({
            error: "Book is not found"
        })
    } else {
        console.log(validationResult);
    library[index] = {... library[index], ... validationResult.result};
    res.status(validationResult.status);
    res.json({
        result: "Book has been successfully updated",
        updatedBook: library[index]
    });
    }
    } else {
        res.status(validationResult.status);
        res.json({ error: validationResult.message })
    }
});

router.delete("/delete/:id", (req, res)=> {
    const {id} = req.params;
    const index = library.findIndex((book)=> {
        return book.id === id;
    });

    if(index === -1) {
        res.json({
            error: "Book is not found",
            code: "404"
        })
    } else {
    library.splice(index, 1);
    res.json({
        result: "Successfully deleted"
    });
    }

});

function validateCreateBookPayload (params) {
    const {id, name, author, year} = params;
    const result = {};
    if(!id) {
        return {
            error: "Id is not found",
            code: 404
        }
    }
    result.id = id;
    if(typeof id === 'string') {
        return {
            error: 'ID should be number',
            code: 404
        }
    }
    console.log(typeof id)
    if(!name) {
        return {
            error: "Name is not found",
            code: 404
        }
    }
    result.name = name;
    if(!author) {
        return {
            error: "Author is not found",
            code: 404
        }
    }
    result.author = author;
    if(!year) {
        return {
            error: "Year is not found",
            code: 404
        }
    }
    result.year = year;
    if(year < "2000") {
        return {
            error: "Book is old, try new one",
            code: 404
        }
    }
    result.year = year;
    return {
        code: 201,
        result
    }
}

function validateUpdateInputs({title, author, createdAt}) {
    const result = {};
    if(title) {
        result.title = title;
    }
    if(author) {
        result.author = author;
    }
    if(createdAt) {
        result.createdAt = createdAt;
    }
    if(Object.keys(result).length === 0) {
        return {
            status: 400,
            message: "At least one field should be filled",
            result
        }
    } else {
        return {
            status: 200,
            message: "Successfully validated",
            result
        }
    }
}

module.exports = router;