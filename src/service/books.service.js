const library = require("../db/library.db");
const { v4: uuidv4 } = require('uuid');
function getAll() {
  return library;
}

function getById(id) {
  const index = library.findIndex((book) => {
    return book.id === id;
  });

  if (index === -1) {
    return {
      error: "Book has not been found",
    };
  } else {
    return {
      result: "Book has been successfully found",
      book: library[index],
    };
  }
}


function create(newBook) {
  library.push(newBook);
  return {
    result: "New book has been successfully added",
    newBook,
  };
}

function update(id, updateParams) {
  const index = library.findIndex((book) => {
    return (book.id = id);
  });

  if (index === -1) {
    return {
      error: "Book is not found",
    };
  } else {
    library[index] = { ...library[index], ...updateParams };
    return {
      result: "Book has been successfully updated",
      updatedBook: library[index],
    };
  }
}

function remove(id) {
  const index = library.findIndex((book) => {
    return book.id === id;
  });
  if (index === -1) {
    return {
      error: "Book is not found",
    };
  } else {
    const deletedBook = library.splice(index, 1);
    return {
      result: "Successfully deleted",
      deletedBook,
    };
  }
}

const rentBook = (id) => {
  const index = library.findIndex((book) => {
    return book.id === id;
  })
  if (index === -1) {
    return {
      error: "Book is not found"
    }
  } else {
    const rentedBook = library.splice(index, 1);
    return {
      result: "Successfully rented",
      rentedBook
    }
  }
}

function validateCreateInputs({ title, author, createdAt }) {
  const result = {};

  result.id = uuidv4();
  if (!title) {
    return {
      message: "Name is not found",
      status: 404,
    };
  }
  result.title = title;
  if (!author) {
    return {
      message: "Author is not found",
      status: 404,
    };
  }
  result.author = author;
  if (!createdAt) {
    return {
      message: "createdAt is not found",
      status: 404,
    };
  }
  result.createdAt = createdAt;
  return {
    status: 201,
    message: "All field are correctly filled",
    result,
  };
}

function validateUpdateInputs({ title, author, createdAt }) {
  const result = {};
  if (title) {
    result.title = title;
  }
  if (author) {
    result.author = author;
  }
  if (createdAt) {
    result.createdAt = createdAt;
  }
  if (Object.keys(result).length === 0) {
    return {
      status: 400,
      message: "At least one field should be filled",
      result,
    };
  } else {
    return {
      status: 200,
      message: "Successfully validated",
      result,
    };
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
  rentBook
};
