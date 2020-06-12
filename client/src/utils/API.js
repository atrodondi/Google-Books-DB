import axios from "axios";
require("dotenv").config();

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = "&printTupe=books&maxResults=20&api_key=" + process.env.API_key;

export default {
  // search for books via api
  searchBooks: function (query) {
    return axios.get(BASEURL + query + APIKEY);
  },

  // saving a book to DB
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },

  // Deletes the book with the given id from DB
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },

  // get saved books
  getBooks: function () {
    return axios.get("/api/books/");
  },
};
