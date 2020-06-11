import React, { Component } from "react";
import Searchbar from "../components/searchBar/searchBar";
import API from "../utils/API";
import ResultsContainer from "../components/resultsContainer/resultsContainer";

// i need to write the function to be passed down to the searchbar component that searchs the api and shit
export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResults: [],
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
    // // getting rid of spaces in query string and replacing with + for the api call
    // let queryParsed = query.split(" ").join("+"); TURNS OUT IT WASNT NEEDED TO GET THE API CALL TO WORK

    API.searchBooks(query)
      .then((res) => {
        let results = res.data.items;
        console.log("ITEMS RETURNED FROM API CALL", results);
        let booksArr = [];
        // create a proper object from the data then set the state to that obj array. then we can just render that array via mapping it to a component
        results.forEach((result) => {
          let book = {
            title: result.volumeInfo.title,
            authors: result.volumeInfo.authors
              // prob not needed, but did it to look nicer?
              .toString()
              .split(",")
              .join(", "),
            description: result.volumeInfo.description,
            image: result.volumeInfo.imageLinks.thumbnail,
            link: result.volumeInfo.infoLink,
            id: result.id
          };
          booksArr.push(book);
        });

        this.setState({ searchResults: booksArr });
        console.log("this.state.searchResults", this.state.searchResults);
      })
      .catch((err) => console.log(err));
  };

  render() {
    // i need to write and pass an onlick function to this searchbar
    return (
      <div>
        <Searchbar
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        ></Searchbar>
        <br />
        <ResultsContainer searchResults={this.state.searchResults} />
      </div>
    );
  }
}
