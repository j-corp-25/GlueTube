import React from "react";
import { useState } from "react";
import { fetchSearchResults } from "../../store/search";
import { useDispatch } from "react-redux";
import { clearSearchResults } from "../../store/search";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const SearchBar = () => {
    const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();
  const [timer, setTimer] = useState(0);
  const searchResults = useSelector((state) => Object.values(state.search));
  const history = useHistory();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
    clearTimeout(timer);

    if (query.trim() !== "") {
        setTimer(setTimeout(() => dispatch(fetchSearchResults(query)), 300))
    } else {
      dispatch(clearSearchResults());
    }
  };
  const handleClick = (id) => {

    return (e) => {
        e.preventDefault();
        history.push(`/videos/${id}`);
        dispatch(clearSearchResults());
        setSearchText("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()!== "") {
        history.push(`/search?query=${searchText}`);
      };
    };

  return (
    <div id="searchbar-container">
      <input
        type="text"
        id="search-input"
        value={searchText}
        onChange={handleSearch}
        className="button-search"
      ></input>

      <button id="searchbar-button" onClick={handleSubmit} >SEARCH</button>
      {searchText && searchResults &&
      <ul id="search-dropdown">
      {searchResults.map((result) => {
        return (<li className="search-dropdown-item" onClick={handleClick(result.id)}>
        {result.title}
        </li>)

      })}

      </ul>}
    </div>
  );
};

export default SearchBar;
