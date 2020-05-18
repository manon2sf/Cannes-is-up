import React, { Component } from "react";

import SearchField from "react-search-field";
import "./SearchBar.css";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <div className="barreRecherche">
          <SearchField
            placeholder="Recherchez : un membre, une activité, un mot clé..."
            className="react-search-field"
          />
          <p className="nombreMembres"> Nombres de membres </p>
        </div>
      </div>
    );
  }
}

export default SearchBar;