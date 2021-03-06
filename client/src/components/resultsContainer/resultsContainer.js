import React from "react";
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
                  <h6 className="card-title">By: {book.authors}</h6>
                  <button
                    onClick={props.handleClickEvent}
                    className="btn btn-danger float-right ml-2"
                    value={JSON.stringify(book)}
                  >
                    Save Book
                  </button>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning float-right"
                  >
                    View Book
                  </a>
                </div>
                <div className="card-body">
                  <br />
                  <img
                    src={book.image}
                    alt={book.title}
                    className="img img-fluid float-left pr-3 pb-3"
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
