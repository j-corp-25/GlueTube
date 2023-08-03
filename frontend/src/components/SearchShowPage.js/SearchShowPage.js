import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { fetchSearchResults } from '../../store/search';
// import './SearchShowPage.scss'
// import { fetchSearchResults } from '../../redux/actions/searchActions'


const SearchShowPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const searchResults = useSelector(state => Object.values(state.search));
    useEffect (( {
      if (query) {
        dispatch(fetchSearchResults(query));
      }

    }))
  return (
    <div></div>
  )
}

export default SearchShowPage
