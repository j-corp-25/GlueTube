import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../store/comments";
import "./Comments.css";
import Avatar from "react-avatar";
import { getComment } from "../../store/comments";
import { useParams } from "react-router-dom";

const Comment = ({videoId}) => {
  const dispatch = useDispatch();
  const { commentId } = useParams();
  console.log("🚀 ~ file: Comment.js:12 ~ Comment ~ commentId:", commentId)
  const comments = useSelector((state) => Object.values(state.comments));
  console.log("🚀 ~ file: Comment.js:STATE ~ Comment ~ comments:", comments);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("🚀 ~ file: Comment.js:10 ~ Comment ~ sessionUser:", sessionUser);
  const comment = useSelector((state) => getComment(comments.commentId)(state));
  console.log("🚀 ~ file: Comment.js:HERE ~ Comment ~ comment:", comment);
  const video = useSelector((state) => state.videos[videoId]);
  console.log("🚀 ~ file: Comment.js:19 ~ Comment ~ video:", video)

  const handleDelete = (commentId) => (e) => {
    e.preventDefault();
    dispatch(deleteComment(commentId));
  };

  return (
    <>
      <div className="comment-container-show-page">
        <h1 className="comment-title">Comments</h1>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment-container-show-page-comments"
          >
            <p>{comment.body}</p>

            <div>
              <h2>{comment.body}</h2>
              {sessionUser?.id === comment.authorId && (
                <>
                <button onClick={handleDelete(comment.id)}>Delete</button>
                </>
              )}
            </div>

            <div>
              <Avatar
                name={comment.author}
                size="35"
                round={true}
                color={Avatar.getRandomColor("sitebase", [
                  "red",
                  "green",
                  "blue",
                ])}
              />{" "}
              Author: {comment.author}
              <p>{comment.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comment;
// const handleDelete = (e) => {
//   e.preventDefault();
//   dispatch(deleteComment(comment.id));
// };

// const handleUpdate = (e) => {
//   e.preventDefault();
//   const updatedComment = {...comment, body: "New comment text"};
//   dispatch(updateComment(updatedComment));
// };

// import { useDispatch, useSelector } from "react-redux";
// import {
//   createVideoComment,
//   updateComment,
//   deleteComment,
//   getComments
// } from "../../store/comments";
// import "./Comments.css";

// const Comment = ({ comment }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(comment.body);
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);

//   function handleEdit(e) {
//     e.preventDefault();
//     console.log("handleEdit");
//     console.log(comment);
//     console.log(editText);
//     dispatch(updateComment(comment.id, { body: editText }));
//     setIsEditing(false);
//   }

//   const handleDelete = (id) => {
//     if (id) {
//       dispatch(deleteComment(id));
//     } else {
//       console.error("Comment ID is undefined");
//     }
//   };

//   return (
//     <div className="comment-container">
//       {isEditing ? (
//         <>
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//           />
//           <button onClick={(e) => handleEdit(e)}>Save</button>
//           <button onClick={() => setIsEditing(false)}>Cancel</button>
//         </>
//       ) : (
//         <>
//           <p className="comment">{comment.body}</p>
//           {sessionUser?.id === comment.author_id && (
//             <>
//               <button onClick={() => setIsEditing(true)}>Edit</button>
//               <button onClick={() => handleDelete(comment.id)}>Delete</button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const Comments = ({ videoId }) => {
//   const dispatch = useDispatch();
//   const comments = useSelector((state) => state.comments);
//   const sessionUser = useSelector((state) => state.session.user);
//   const [newComment, setNewComment] = useState("");
//   // debugger
//   const video = useSelector((state) => state.videos[videoId]);
//   // debugger
//   const commentIds = video.commentIds;
//   // debugger

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createVideoComment(videoId, { body: newComment }, sessionUser.id));
//     setNewComment("");
//   };

//   const handleEdit = (id, text) => {
//     dispatch(updateComment(id, { body: text }));
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteComment(id));
//   };

//   let sortedComments;

//   if (video && comments) {
//     // debugger
//     sortedComments = commentIds.map((id) => (comments[id])
//     )
//   }
//   debugger
//   return (
//     <>
//     { comments && (
//       <div className="comment-container-show-page">
//         <h1 className="comment-title">Comments</h1>
//         <div className="comment-container-show-page-comments">
//           <div className="comment-container-show-page-comments-comment">
//             {sessionUser && (
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   placeholder="Write a comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                 />
//                 <button className="submit-container">Submit</button>
//               </form>
//             )}

//             {/* {sortedComments.map((comment) => (
//               <div key={comment.id}>
//                 <Comment
//                   comment={comment}
//                   videoId={videoId}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                 />
//               </div>
//             ))} */}
//           </div>
//         </div>
//       </div>
//     )}
//     </>
//   );
// };

// export default Comments;
