const express = require("express");
const Book = require("../Models/bookModel");

const router = express.Router();

// /api/v1/books GET
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();

    return res.status(200).json({
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/v1/books/add
router.post("/add", async (req, res) => {
  try {
    const { name, author, genre, dateOfRelease, rating, price, bookImage } =
      req.body;

    if (!name || !author || !genre || !dateOfRelease || !rating || !price) {
      return res.status(400).send();
    }

    const newBook = {
      name,
      author,
      genre,
      dateOfRelease,
      rating,
      price,
      bookImage,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/v1/books/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: {
        id: id,
      },
    });

    if (!book) {
      return res.status(404).send();
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/v1/books/:id PUT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, author, genre, dateOfRelease, rating, price, bookImage } =
      req.body;

    const updatedData = {
      name,
      author,
      genre,
      dateOfRelease,
      rating,
      price,
      bookImage,
    };

    //     -->> Searching product in database
    const book = await Book.findOne({
      where: {
        id: id,
      },
    });

    if (!book) {
      return res.status(404).send();
    }

    await Book.update(updatedData, {
      where: { id },
    });

    const updatedProduct = await Product.findByPk(id);

    return res.status(200).send(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// /api/v1/books/:id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({
      where: {
        id: id,
      },
    });

    if (!book) {
      return res.status(404).send();
    }

    await Book.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
