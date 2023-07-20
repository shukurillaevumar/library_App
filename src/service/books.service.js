const library = require("../db/library.db");

function getAll () {
    return library;
}

function getById(id) {
    const index = library.findIndex((book)=> {
        return book.id === id;
    });

    if(index === -1) {
        return {
            error: "Book has not been found"
        };
    } else {
        return {
            result: "Book has been successfully found",
            book: library[index]
        }
    }
}

// function validateCreateInput ({id, title, author, createdAt}) {
//     const result = {};
//     if(!id) {
//         return {
//             status: 404,
//             message: "Id is not found"
//         };
//     }

//     result.id = id;

//     if(!title) {
//         return {
//             status: 404,
//             message: "Title is not found"
//         };
//     }

//     result.title = title;

//     if(!author) {
//         return {
//             status: 404,
//             message: "Authot is not found"
//         };
//     }

//     result.author = author;

//     if(!createdAt) {
//         return {
//             status: 404,
//             message: "CreatedAt is not found"
//         };
//     }

//     result.createdAt = createdAt;

//     return {
//         status: 200,
//         message: "All fields successfully validated",
//         result
//     };
// }

function create (newBook) {
    library.push(newBook);
    return {
        result: "New book has been successfully added",
        newBook
    };
}

function update (id, updateParams) {
    const index = library.findIndex((book) => {
        return book.id = id;
    });

    if(index === -1) {
        return {
            error: "Book is not found"
        }
    } else {
        library[index] = {... library[index], ... updateParams};
        return {
            result: "Book has been successfully updated",
            updatedBook: library[index]
        };
    }
}

function remove(id) {
    const index = library.findIndex((book) => {
        return book.id === id;
    });
    if(index === -1) {
        return {
            error: "Book is not found"
        }
    } else {
        const deletedBook = library.splice(index, 1);
        return {
            result: "Successfully deleted",
            deletedBook
        }
    }
}

function validateCreateInputs (params) {
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

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    validateUpdateInputs,
    validateCreateInputs,
}