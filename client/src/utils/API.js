import axios from "axios";
require("dotenv").config();

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = "&maxResults=10&api_key=" + process.env.API_key;

export default {
  searchBooks: function (query) {
    return axios.get(BASEURL + query + APIKEY);
  },
};
