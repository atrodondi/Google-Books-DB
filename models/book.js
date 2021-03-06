const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: String,
  image: String,
  id:String,
  link: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
