const express = require("express");
const router = express.Router();
const bookService = require("../service/books.service");
const { authorize } = require("../middleware/auth.middleware");

router.get("/all", authorize, (req, res) => {
  const user = req.user;
  if (user.role === "USER" || user.role === "LIBRARIAN") {
    res.json(bookService.getAll());
  } else {
    return res
    .status(401)
    .json({ error: "You dont have an access for this route" });
  }

});

router.get("/:id", authorize,  (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (user.role === "USER" || user.role === "LIBRARIAN") {
    res.json(bookService.getById(id));
  } else {
    return res
    .status(401)
    .json({ error: "You dont have access for this route" })
  }
});

router.post("/create", authorize, (req, res) => {
  const user = req.user;
  if(user.role === "LIBRARIAN") {
    const validatedResult = bookService.validateCreateInputs(req.body);
    if (validatedResult.status === 201) {
      res.json(bookService.create(validatedResult.result));
    } else {
      res.status(validatedResult.status);
      res.json({ error: validatedResult.message });
    }
  } else {
    return res
    .status(401)
    .json({ error: "You dont have access for this route" })
  }
});

router.put("/edit/:id", authorize, (req, res) => {
  const user = req.user;
  if(user.role === "LIBRARIAN") {
    const validationResult = bookService.validateUpdateInputs(req.body);
    const { id } = req.params;

  if ((validationResult.status === 200) & id) {
    res.send(bookService.update(id, validationResult.result));
  } else {
    res.status(validationResult.status);
    res.json({ error: validationResult.message });
  }
  } else {
    return res
    .status(401)
    .json({ error: "You dont have access for this route" })
  }
});

router.delete("/delete/:id", authorize, (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (user.role === "LIBRARIAN") {
  res.json(bookService.remove(id));
  } else {
    return res
    .status(401)
    .json({ error: "You dont have access for this route" })
  }

});

//Rent a book
router.post("/rent/:id", authorize, (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (user.role === "USER") {
    res.json(bookService.rentBook(id));
  } else {
    return res
    .status(401)
    .json({ error: "You dont have access for this route" })
  }
});
// Return a book
router.post("/return", (req, res) => {});
module.exports = router;
