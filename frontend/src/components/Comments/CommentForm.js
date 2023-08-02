// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createVideoComment } from '../../store/comments';

// function CommentForm({ videoId }) {
//   const dispatch = useDispatch();
//   const [body, setBody] = useState('');

//   const user = useSelector((state) => state.session.user);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (body !== '') {
//       dispatch(createVideoComment(videoId, body, user.id));
//       setBody('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         required
//       />
//       <button type="submit">Post Comment</button>
//     </form>
//   );
// }

// export default CommentForm;
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createVideoComment, updateComment } from '../../../store/comments'; // Update with your actual path
// import "./Comments.css"

// const CommentForm = ({ videoId, userId, comment, onEditDone }) => {
//   const dispatch = useDispatch();
//   const [body, setBody] = useState('');

//   // Load comment into state if editing
//   useEffect(() => {
//     if (comment) {
//       setBody(comment.body);
//     }
//   }, [comment]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const commentData = { body };

//     if (comment) {
//       // Updating existing comment
//       dispatch(updateComment(comment.id, commentData));
//       if (onEditDone) onEditDone(); // Callback to notify parent component if needed
//     } else {
//       // Creating new comment
//       dispatch(createVideoComment(videoId, commentData, userId));
//     }
//     setBody(''); // Clear the input field
//   };

//   return (
//     <form className="comment-form" onSubmit={handleSubmit}>
//       <label>
//         Comment:
//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Write your comment here..."
//           required
//         />
//       </label>
//       <button type="submit">{comment ? 'Update' : 'Submit'}</button>
//     </form>
//   );
// };

// export default CommentForm;
