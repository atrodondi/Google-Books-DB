import React, { Component } from "react";
import Searchbar from "../components/searchBar/searchBar";
import API from "../utils/API";
import ResultsContainer from "../components/resultsContainer/resultsContainer";
import Navbar from "../components/navbar/navbar";
import Jumbotron from "../components/jumbotron/jumbotron";


export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResults: [],
      savedBooks: [],
      navbarText: "GoogleBooks API",
      navbarColor:"black"
    };
  }

  //   handling input change of the search bar
  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  //   handle form submit on search
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery === "") {
      alert("Please enter in a search query!");
    } else {
      this.bookSearch(this.state.searchQuery);
      this.setState({ searchQuery: "" });
    }
  };

  //   when the search button is clicked, this function handles the api call
  bookSearch = (query) => {

    API.searchBooks(query)
      .then((res) => {
        let results = res.data.items;
        let booksArr = [];
        // create a proper object from the data then set the state to that obj array. then we can just render that array via mapping it to a component

        // had to make a bunch of conditions because some of the API calls would have certain key values blank. maybe i will find a cleaner way to filter the bs out later. ANY COMMENTS ON HOW TO CLEAN THIS UP WOULD BE APPRECIATED
        results.forEach((result) => {
          if (result.volumeInfo.imageLinks === undefined) {
            let book = {
              title: result.volumeInfo.title,
              authors: result.volumeInfo.authors
                // prob not needed, but did it to look nicer?
                .toString()
                .split(",")
                .join(", "),
              description: result.volumeInfo.description,
              image: "no image avail",
              link: result.volumeInfo.infoLink,
              id: result.id,
            };
            booksArr.push(book);
          } else if (result.volumeInfo.authors === undefined) {
            let book = {
              title: result.volumeInfo.title,
              authors: "Author Not Available",

              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink,
              id: result.id,
            };
            booksArr.push(book);
          } else {
            let book = {
              title: result.volumeInfo.title,
              authors: result.volumeInfo.authors,

              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink,
              id: result.id,
            };
            booksArr.push(book);
          }
        });

        this.setState({ searchResults: booksArr });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // save a book to the DB
  saveBook = (query) => {
    // code to make the DB call to save the book to the api
    API.saveBook(query)
      .then((res) => {
        this.state.savedBooks.push(res.data);
        let currentState = this.state.searchResults;
        let newState = currentState.filter((book) => book.id !== res.data.id);
        this.setState({ searchResults: newState });
      })
      .catch((err) => {
        console.log(err);

        let currentState = this.state.searchResults;
        let newState = currentState.filter((book) => book.id !== query.id);
        this.setState({ searchResults: newState });
      });
  };
  // return to starter navbarText color
  startingNavText = () => {
    
    const timer = setTimeout(() => {
      this.setState({ navbarText: "GoogleBooks API" , navbarColor:"black"});
    }, 1000);
    return () => clearTimeout(timer);
  };

  //handle saveClick event
  handleSaveClick = (event) => {
    let bookObj = event.target.value;
    let query = JSON.parse(bookObj);
    this.saveBook(query);
    this.setState({ navbarText: "BOOK SAVED" , navbarColor:"green"});
    this.startingNavText();
  };

  // rendering content
  render() {
    return (
      <div>
        <Navbar navbarColor={this.state.navbarColor} navbarText={this.state.navbarText} />
        <br />
        <Jumbotron />
        <br />
        <Searchbar
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        ></Searchbar>
        <br />
        <ResultsContainer
          saveBook={this.saveBook}
          searchResults={this.state.searchResults}
          handleClickEvent={this.handleSaveClick}
        />
      </div>
    );
  }
}
