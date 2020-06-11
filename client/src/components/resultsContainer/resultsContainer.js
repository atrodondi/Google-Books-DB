import React from "react";
import Book from "../book/book";
import { List, ListItem } from "../list/list";

export default function resultsContainer(props) {
  return (
    <div className="card">
      <div className="card-header">Search Results</div>
      <div className="card-body" id="resultsContainer">
        <List>
          {props.searchResults.map((book) => (
            <ListItem key={book.id}>
              <div className="card">
                <div className="card-header">
                  <h3>{book.title}</h3>
                  {/* view and save button go around here abouts inside the header, floating left  */}
                </div>
                <div className="card-body">
                  <h6 className="card-title">By: {book.authors}</h6>
                  <br />
                  <img
                    src={book.image}
                    alt={book.title}
                    className="img img-fluid float-left p-3"
                  ></img>

                  <p>{book.description}</p>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
