const router = require('express').Router();
const books = require('./books');

let booksDirectory = books;

router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(books => books.isbn == id);

    if (!book) return res.status(404).send("Book is not availble");

    res.send(book);
});

module.exports = router;