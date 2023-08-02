// import React from 'react';

// const CommentItem = ({ comment, userId, onEdit, onDelete }) => {
//   const isAuthor = userId === comment.author_id; // Adjust based on your data structure

//   return (
//     <div className="comment-item">
//       <div className="comment-author">
//         <strong>{comment.author}</strong>
//       </div>
//       <div className="comment-body">
//         {comment.body}
//       </div>
//       <div className="comment-metadata">
//         <span className="comment-date">{comment.createdAt}</span>
//         {isAuthor && (
//           <div className="comment-actions">
//             <button onClick={() => onEdit(comment)}>Edit</button>
//             <button onClick={() => onDelete(comment.id)}>Delete</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentItem;


// import React, { useState } from 'react';

// const CommentItem = ({ comment, userId, onEdit, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     // Call the onEdit function with the updated comment data
//     onEdit(comment.id);
//     setIsEditing(false);
//   };

//   return (
//     <div className="comment-item">
//       {/* ... other comment content */}
//       {comment.author_id === userId && !isEditing && (
//         <button onClick={handleEditClick}>Edit</button>
//       )}
//       {isEditing ? (
//         <div className="comment-edit-form">
//           {/* Form to edit the comment */}
//           <button onClick={handleSaveClick}>Save</button>
//         </div>
//       ) : (
//         // ... regular comment display
//       )}
//     </div>
//   );
// };

// export default CommentItem;
// import React, { useState } from 'react';
// import "./Comments.css"

// const CommentItem = ({ comment, userId, onDelete, onEdit }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedComment, setEditedComment] = useState(comment.body);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     onEdit(editedComment);
//     setIsEditing(false);
//   };

//   const handleInputChange = (e) => {
//     setEditedComment(e.target.value);
//   };

//   return (
//     <div className="comment-item">
//       <div className="comment-author">
//         <strong>{comment.author}</strong>
//       </div>
//       {isEditing ? (
//         <div className="comment-editing">
//           <input type="text" value={editedComment} onChange={handleInputChange} />
//           <button onClick={handleSaveClick}>Save</button>
//         </div>
//       ) : (
//         <div className="comment-body">
//           {comment.body}
//         </div>
//       )}
//       <div className="comment-metadata">
//         <span className="comment-date">{comment.createdAt}</span>
//         {comment.authorId === userId && !isEditing && (
//           <div className="comment-actions">
//             <button onClick={handleEditClick}>Edit</button>
//             <button onClick={onDelete}>Delete</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentItem;
