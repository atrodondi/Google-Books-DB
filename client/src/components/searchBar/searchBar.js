import React from "react";

function searchBar(props) {
  return (
    <form>
      <div className="card">
        <div className="card-header">Book Search</div>
        <div className="card-body">
          <h5 className="card-title">
            Type in search parameters for a search of Google Books!
          </h5>
          <div className="form-group">
            <input
              className="form-control"
              onChange={props.onChange}
              value={props.value}
            />
          </div>

          <button onClick={props.handleFormSubmit} className="btn btn-primary">
            Search Books
          </button>
        </div>
      </div>
    </form>
  );
}

export default searchBar;
