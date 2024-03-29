import { RECEIVE_COMMENTS } from './comments'
import csrfFetch from './csrf'
export const RECEIVE_VIDEOS = 'videos/RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'videos/RECEIVE_VIDEO'
export const REMOVE_VIDEO = 'videos/REMOVE_VIDEO'

export const getVideo = (videoId) => {
  return (state) => {
    if (state.videos && state.videos[videoId]) {
      return state.videos[videoId]
    } else {
      return null
    }
  }
}

export const getVideos = (state) => {
  if (!state.videos) {
    return []
  } else {
    return Object.values(state.videos)
  }
}

export const fetchVideos = () => async (dispatch) => {
  const response = await csrfFetch('/api/videos')
  const data = await response.json()

  dispatch({
    type: RECEIVE_VIDEOS,
    videos: data,
  })
}

export const fetchVideo = (videoId) => async (dispatch) => {
  const response = await csrfFetch(`/api/videos/${videoId}`)
  const data = await response.json()

  dispatch({
    type: RECEIVE_VIDEO,
    video: data,
  })
}

export const createVideo = (formData) => async (dispatch) => {
  const response = await csrfFetch('/api/videos', {
    method: 'POST',
    body: formData,
  })
  if (parseInt(response.headers.get('Content-Length')) > 0) {
    const data = await response.json()

    dispatch({
      type: RECEIVE_VIDEO,
      video: data,
    })
  }
  return response
}

export const updateVideo = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/videos/${formData.get('video[id]')}`, {
    method: 'PATCH',
    body: formData,
  })

  if (parseInt(response.headers.get('Content-Length')) > 0) {
    const data = await response.json()

    dispatch({
      type: RECEIVE_VIDEO,
      video: data,
    })
  }

  return response
}

export const deleteVideo = (videoId) => async (dispatch) => {
  await csrfFetch(`/api/videos/${videoId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  dispatch({
    type: REMOVE_VIDEO,
    videoId: videoId,
  })
}

const videosReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_VIDEO:
      return { ...state, ...action.video.video }

    case RECEIVE_VIDEOS:
      const newState = { ...state, ...action.videos.videos }

      return newState

    case REMOVE_VIDEO:
      const { [action.videoId]: removedVideo, ...remainingState } = state
      return remainingState

    default:
      return state
  }
}
export default videosReducer

// const videosReducer = (state = {}, action) => {
//     switch(action.type) {
//       case RECEIVE_VIDEO:
//         return { ...state, ...action.video.video };

//       case RECEIVE_VIDEOS:
//         const newState = {...state, ...action.videos.videos};
//         return newState;

//       case RECEIVE_COMMENT: {
//         const { comment, videoId } = action;
//         const video = state[videoId];
//         if (video) {
//           return {
//             ...state,
//             [videoId]: {
//               ...video,
//               comments: {
//                 ...video.comments,
//                 [comment.id]: comment,
//               }
//             }
//           };
//         } else {
//           return state; // If video not found, return the current state
//         }
//       }

//       case REMOVE_VIDEO:
//         const { [action.videoId]: removedVideo, ...remainingState } = state;
//         return remainingState;

//       default:
//         return state;
//     }
//   }

// //   export default videosReducer;
