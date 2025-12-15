const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/", async (req, res) => {
  const { title } = req.body;

  try {
    // Fetch book info from Google Books API
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
      title
    )}&key=${process.env.API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    const bookInfo = data.items?.[0]?.volumeInfo || {};
    const newBook = new Book({
      title: bookInfo.title || title,
      authors: bookInfo.authors || ["Unknown"],
      description: bookInfo.description || "",
      thumbnail: bookInfo.imageLinks?.thumbnail || "",
    });

    await newBook.save();

    res.status(201).json({ saved: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving book" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json({ message: "All books deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting books" });
  }
});

module.exports = router;
