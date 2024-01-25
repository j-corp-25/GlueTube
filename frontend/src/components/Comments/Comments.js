import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createVideoComment,
  updateComment,
  deleteComment,
} from "../../store/comments";
import "./Comments.css";
import Avatar from "react-avatar";
const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  function handleEdit(e) {
    e.preventDefault();
    dispatch(updateComment(comment.id, { body: editText }));
    setIsEditing(false);
  }

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteComment(id));
    } else {
      console.error("Comment ID is undefined");
    }
  };

  return (
    <div className="comment-container">
      <div className="profile-icon-container">
        <Avatar
          name={comment.author}
          size="35"
          round={true}
          color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
        />
      </div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={(e) => handleEdit(e)}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <div className="comment-content">
          <div className="comment-author">{comment.author}</div>
          <p className="comment">{comment.body}</p>
          {sessionUser?.id === comment.authorId && (
            <div className="comment-options">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const [newComment, setNewComment] = useState("");

  const video = useSelector((state) => state.videos[videoId]);

  const commentIds = video.commentIds;


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoComment(videoId, { body: newComment }, sessionUser.id));
    setNewComment("");
  };

  const handleEdit = (id, text) => {
    dispatch(updateComment(id, { body: text }));
  };

  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  let sortedComments = [];


  if (video && video.commentIds) {
    sortedComments = video.commentIds.map((id) => comments[id]).filter(Boolean);
  }

  return (
    <>
      {comments && (
        <div className="comment-container-show-page">
          <h1 className="comment-title">Comments</h1>
          <div className="comment-container-show-page-comments pl-0">
            <div className="comment-container-show-page-comments-comment ">
              <form onSubmit={handleSubmit} >

                <input
                  type="text"

                  placeholder={
                    sessionUser
                      ? "Write a comment..."
                      : "You need to be logged in to comment"
                  }
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!sessionUser}
                />
                <button className="submit-container" disabled={!sessionUser}>
                  Submit
                </button>
              </form>

              {sortedComments.map((comment) => (
                <div key={comment.id}>
                  <Comment
                    comment={comment}
                    videoId={videoId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
// return (
//   <>
//     {comments && (
//       <div className="comment-container-show-page">
//         <h1 className="comment-title">Comments</h1>
//         <div className="comment-section">
//           {sessionUser && (
//             <div className="comment-input-section">
//               <Avatar
//                 name={sessionUser.username}
//                 size="35"
//                 round={true}
//                 color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
//               />
//               <form onSubmit={handleSubmit} className="comment-form">
//                 <input
//                   type="text"
//                   placeholder="Write a comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                 />
//                 <button className="submit-container">Submit</button>
//               </form>
//             </div>
//           )}

//           {sortedComments.map((comment) => (
//             <div key={comment.id} className="comment">
//               <Avatar
//                 name={comment.author.username}
//                 size="35"
//                 round={true}
//                 color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
//               />
//               <div className="comment-body">
//                 <h3>{comment.author.username}</h3>
//                 <p>{comment.body}</p>
//                 {/* Add Edit and Delete buttons if needed */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </>
// );

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { createVideoComment } from "../../../store/comments";

// const CommentForm = ({ videoId }) => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);

//   const [text, setText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newComment = {
//       text: text,
//       videoId: videoId,
//       authorId: sessionUser.id,
//     };
//     dispatch(createVideoComment(videoId, newComment, sessionUser.id));
//     setText("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a comment..."
//       />
//       <button type="submit">Post Comment</button>
//     </form>
//   );
// };

// export default CommentForm;
