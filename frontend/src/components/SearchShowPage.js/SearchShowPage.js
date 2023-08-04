import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";
import "./SearchShowPage.css";
import VideoList from "../Videos/VideoIndex/VideoList";
import NavBar from "../NavBar/NavBar";
import "../NavBar/NavBar.css"
// import './SearchShowPage.scss'
// import { fetchSearchResults } from '../../redux/actions/searchActions'

const SearchShowPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const searchResults = useSelector((state) => Object.values(state.search));
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  },[]);
  return <div className="test">
  <NavBar />
  <VideoList searchResults={searchResults}/>
  </div>;
};

export default SearchShowPage;
