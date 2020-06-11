import React, { Component } from "react";
import Searchbar from "../components/searchBar/searchBar";
import API from "../utils/API";

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
    this.bookSearch(this.state.searchQuery);
  };

  //   when the search button is clicked, this function handles the api call
  bookSearch = (query) => {
    console.log("clicked the search");
    // getting rid of spaces in query string and replacing with + for the api call
    let queryParsed = query.split(" ").join("+");

    console.log(queryParsed);
    API.searchBooks(query)
      .then((res) => {
        console.log(res.data.items);
        // create a proper object from the data then set the state to that obj array. then we can just render that array via mapping it to a component
      })
      .catch((err) => console.log(err));
  };

  render() {
    // i need to write and pass an onlick function to this searchbar
    return (
      <Searchbar
        value={this.state.searchQuery}
        onChange={this.handleInputChange}
        handleFormSubmit={this.handleFormSubmit}
      ></Searchbar>
    );
  }
}
