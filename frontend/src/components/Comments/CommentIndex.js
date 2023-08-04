// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getComments } from '../../store/comments';
// import { fetchComments } from '../../store/comments'; // Adjust the path as needed
// import CommentItem from './CommentItem'; // You may want to create a separate component for individual comments

// const CommentIndex = ({ videoId }) => {
//   const dispatch = useDispatch();
//   const comments = useSelector((state) => getComments(state)); // Make sure getComments selector is imported

//   useEffect(() => {
//     dispatch(fetchComments(videoId));
//   }, [dispatch, videoId]);

//   return (
//     <div className="comments-container">
//       <h3>Commentsnjjj</h3>
//       <ul className="comments-list">
//         {comments.map((comment) => (
//           <CommentItem key={comment.id} comment={comment} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentIndex;
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import CommentItem from './CommentItem';
// import { fetchComments, deleteComment, updateComment } from '../../store/comments'; // import your actions
// import { getComments } from '../../store/comments'; // import your selectors
// import { useEffect } from'react';
// import "./Comments.css"

// const CommentIndex = ({ videoId, userId }) => {
//   const dispatch = useDispatch();
//   const comments = useSelector((state) => getComments(state, videoId)); // Adjust the selector if needed

//   useEffect(() => {
//     dispatch(fetchComments(videoId));
//   }, [dispatch, videoId]);

//   const handleDelete = (commentId) => {
//     dispatch(deleteComment(commentId));
//   };

//   const handleEdit = (commentId, newContent) => {
//     dispatch(updateComment(commentId, newContent));
//   };

//   return (
//     <div className="comments-container">
//       <h3>Comments</h3>
//       <ul className="comments-list">
//         {comments.map((comment) => (
//           <CommentItem
//             key={comment.id}
//             comment={comment}
//             userId={userId}
//             onDelete={() => handleDelete(comment.id)}
//             onEdit={(newContent) => handleEdit(comment.id, newContent)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentIndex;
