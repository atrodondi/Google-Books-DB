const db = require("../models");

// Defining methods for the booksController
module.exports = {
  // for when loading saved page
  findAll: function (req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // saving a book
  create: function (req, res) {
    let body = req.body;
    let book = {
      title: body.title,
      author: body.authors.toString().split(",").join(", "),
      description: body.description,
      image: body.image,
      link: body.link,
      id: body.id,
    };
    db.Book.create(book)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // deleting book
  remove: function (req, res) {
    db.Book.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
