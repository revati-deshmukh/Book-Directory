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

router.post('/books', function (req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const isBookExists = booksDirectory.find(book => book.isbn == isbn);
    if (isBookExists) return res.send("Book already exists");

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
});

router.put('/books/:id', function (req, res) {
    const { id } = req.params;

    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const isBookExists = booksDirectory.find(book => book.isbn == id);
    if (!isBookExists) return res.status(404).send("Book does not exists");

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...isBookExists,
        title: updateField(title, isBookExists.title),
        pageCount: updateField(pageCount, isBookExists.pageCount),
        publishedDate: updateField(publishedDate, isBookExists.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, isBookExists.thumbnailUrl),
        shortDescription: updateField(shortDescription, isBookExists.shortDescription),
        longDescription: updateField(longDescription, isBookExists.longDescription),
        status: updateField(status, isBookExists.status),
        authors: updateField(authors, isBookExists.authors),
        categories: updateField(categories, isBookExists.categories)
    }

    const bookIndex = booksDirectory.find(book => book.isbn == id);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.send(updatedBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    const isBook = booksDirectory.find(book => book.isbn == id);
    if (!isBook) return res.status(404).send("Book does not exists");

    booksDirectory = booksDirectory.filter(book => book.isbn != id);

    return res.send(booksDirectory);
});

module.exports = router;