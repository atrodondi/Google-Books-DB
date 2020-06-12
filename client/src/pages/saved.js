import React, { Component } from "react";
import API from "../utils/API";
import SavedContainer from "../components/savedContainer/savedContainer";

export default class SavedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedBooks: [],
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
          let newState = currentState.filter(book=>book.id !== res.data.id)
          this.setState({savedBooks:newState})
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  //   handleDeleteClick
  handleDelete = (event) => {
    let ID = event.target.id;
    this.deleteBook(ID);
  };
  //   rendering content
  render() {
    return (
      <div>
        <SavedContainer
          savedBooks={this.state.savedBooks}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
