import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideoComment,
  updateComment,
  deleteComment,
  getComments,
  getComment,
} from "../../store/comments";
import "./Comments.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateVideo } from "../../store/videos";

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body);
  const dispatch = useDispatch();

  function handleEdit() {
    return (e) => {
      e.preventDefault();
      dispatch(updateComment(comment.id, { body: editText })); // Updated this line
      setIsEditing(false); // <-- Switch off the editing mode after saving
    };
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
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit()}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p className="comment">{comment.body}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => getComments(state));
  const sessionUser = useSelector((state) => state.session.user);
  const [newComment, setNewComment] = useState("");

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

  return (
    <div className="comment-container-show-page">
      <h1 className="comment-title">Comments</h1>
      <div className="comment-container-show-page-comments">
        <div className="comment-container-show-page-comments-comment">
          {sessionUser && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="submit-container">Submit</button>
            </form>
          )}
          {Object.values(comments).map((comment) => (
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
  );
};

export default Comments;
