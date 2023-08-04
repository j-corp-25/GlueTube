import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = "search/SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "search/CLEAR_SEARCH_RESULTS";

export const receiveSearchResults = (searchResults) => ({
  type: GET_SEARCH_RESULTS,
  searchResults,
});

export const clearSearchResults = () => ({ type: "CLEAR_SEARCH_RESULTS" });

export const fetchSearchResults = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/videos/search?query=${query}`);
  const data = await response.json();

  dispatch(receiveSearchResults(data));
};

const searchReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_SEARCH_RESULTS:
        console.log(action)
     


      return { ...action.searchResults.videos };
    case CLEAR_SEARCH_RESULTS:
      return {};
    default:
      return newState;
  }
};

export default searchReducer;
