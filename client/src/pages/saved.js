import React, { Component } from "react";
import API from "../utils/API";
import SavedContainer from "../components/savedContainer/savedContainer";
import Navbar from "../components/navbar/navbar";
import Jumbotron from "../components/jumbotron/jumbotron";

export default class SavedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: [],
      navbarText:"GoogleBooks API",
      navbarColor:"black"
    };
  }

  //   when saved page loads
  componentDidMount = () => {
    API.getBooks()
      .then((res) => {
        this.setState({ savedBooks: res.data });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  //   deletebook
  deleteBook = (query) => {
    API.deleteBook(query)
      .then((res) => {
        let currentState = this.state.savedBooks;
        let newState = currentState.filter((book) => book.id !== res.data.id);
        this.setState({ savedBooks: newState });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  // return to starter navbarText
  startingNavText = () => {
    
    const timer = setTimeout(() => {
      this.setState({ navbarText: "GoogleBooks API" , navbarColor:"black"});
    }, 500);
    return () => clearTimeout(timer);
  };

  //   handleDeleteClick
  handleDelete = (event) => {
    let ID = event.target.id;
    this.deleteBook(ID);
    this.setState({navbarText: "BOOK DELETED", navbarColor:"red"});
    this.startingNavText();

  };
  //   rendering content
  render() {
    return (
      <div>
        <Navbar navbarColor={this.state.navbarColor} navbarText={this.state.navbarText} />
        <br />
        <Jumbotron />
        <br />
        <SavedContainer
          savedBooks={this.state.savedBooks}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
