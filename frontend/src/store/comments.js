import csrfFetch from "./csrf";

export const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";

export const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";

export const DELETE_COMMENT = "comments/DELETE_COMMENT";

export const CLEAR_COMMENTS = "comments/CLEAR_COMMENTS";

export const clearComments = () => ({
  type: CLEAR_COMMENTS
});

export const getComment = (commentId) => (state) => {
  return state.comments ? state.comments[commentId] : null;
};

export const getComments = (state) => Object.values(state.comments || []);

export const fetchComments = (videoId) => async (dispatch) => {
  const response = await csrfFetch(`/api/videos/${videoId}/comments`);
  const data = await response.json();
  dispatch({
    type: RECEIVE_COMMENTS,
    comments: data,
  });
};
export const fetchComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`);
  const data = await response.json();
  dispatch({
    type: RECEIVE_COMMENT,
    comment: data,
  });
};

// export const createVideoComment = (videoId, comment) => async (dispatch) => {
//   const response = await csrfFetch(`/api/videos/${videoId}/comments`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment),
//   });
//   const data = await response.json();
//   if (response.ok) {
//     dispatch({
//       type: RECEIVE_COMMENT,
//       comment: data,
//     });
//   }
//   return data;
// };
export const createVideoComment = (videoId, comment, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/videos/${videoId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...comment, authorId: userId }),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch({
      type: RECEIVE_COMMENT,
      comment: data,
    });
  }
  return data;
};
// POST   /api/videos/:video_id/comments(.:format)

export const updateComment = (comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const data = await response.json();
  dispatch({
    type: RECEIVE_COMMENT,
    comment: data,
  });
};

// api_comment PATCH  /api/comments/:id(.:format)   api/comments#update
// PUT    /api/comments/:id(.:format)               api/comments#update
export const deleteComment = (commentId) => async (dispatch) => {
  await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  dispatch({
    type: DELETE_COMMENT,
    commentId: commentId,
  });
};

export const commentsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      newState = { ...newState, ...action.comments };
      return newState;
    }
    case RECEIVE_COMMENT: {
      newState = { ...newState, [action.comment.id]: action.comment };
      return newState;
    }
    case DELETE_COMMENT: {
      delete newState[action.commentId];
      return newState;
    }
    case CLEAR_COMMENTS: {
      return {};
    }
    default:
      return state;
  }
};

export default commentsReducer;
// api_users GET    /api/users(.:format)                                                                              api/users#index {:format=>:json}
// POST   /api/users(.:format)                                                                              api/users#create {:format=>:json}
// api_video_comments GET    /api/videos/:video_id/comments(.:format)                                                          api/comments#index {:format=>:json}
// POST   /api/videos/:video_id/comments(.:format)                                                          api/comments#create {:format=>:json}
// api_videos GET    /api/videos(.:format)                                                                             api/videos#index {:format=>:json}
// POST   /api/videos(.:format)                                                                             api/videos#create {:format=>:json}
// api_video GET    /api/videos/:id(.:format)                                                                         api/videos#show {:format=>:json}
// PATCH  /api/videos/:id(.:format)                                                                         api/videos#update {:format=>:json}
// PUT    /api/videos/:id(.:format)                                                                         api/videos#update {:format=>:json}
// DELETE /api/videos/:id(.:format)                                                                         api/videos#destroy {:format=>:json}
// api_comment PATCH  /api/comments/:id(.:format)                                                                       api/comments#update {:format=>:json}
// PUT    /api/comments/:id(.:format)                                                                       api/comments#update {:format=>:json}
// DELETE /api/comments/:id(.:format)                                                                       api/comments#destroy {:format=>:json}
// api_session GET    /api/session(.:format)                                                                            api/sessions#show {:format=>:json}
// DELETE /api/session(.:format)                                                                            api/sessions#destroy {:format=>:json}
// POST   /api/session(.:format)                                                                            api/sessions#create {:format=>:json}
