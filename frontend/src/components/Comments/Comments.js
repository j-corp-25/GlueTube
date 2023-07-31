// import React from "react";
// import Avatar from "../NavBar/NavBar";
// import "./Comments.css";
// import { fetchComments, getComments } from "../../store/comments";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// const Comments = () => {
//     const dispatch = useDispatch();
//     const comments = useSelector(getComments);

//     useEffect(() => {
//         dispatch(fetchComments());
//     }, [])

//   return (
//     <div className="comment-container-show-page">
//       <h1>Comments</h1>
//       <div className="comment-container-show-page-comments">
//         <div className="comment-container-show-page-comments-comment">
//             {/* <Avatar /> */}
//             <form>
//             <input type="text" placeholder="Write a comment..." />
//             </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Comments;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideoComment,
  fetchComments,
  getComments,
} from "../../store/comments";
import Avatar from "../NavBar/NavBar";
import "./Comments.css";

const Reply = ({ reply }) => (
  <div>
    <p>{reply.body}</p>
  </div>
);

const Comment = ({ comment, videoId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoComment(videoId, { body: replyText, parent_id: comment.id }, sessionUser.id));
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className="comment">
      <p>{comment.body}</p>
      {isReplying && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit">Submit Reply</button>
        </form>
      )}
      <button onClick={handleReplyClick}>Reply</button>
      {comment.replies && comment.replies.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => getComments(state));
  const sessionUser = useSelector((state) => state.session.user);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(fetchComments(videoId));
  }, [dispatch, videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoComment(videoId, { body: newComment }, sessionUser.id));
    setNewComment("");
  };

  return (
    <div className="comment-container-show-page">
      <h1>Comments</h1>
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
              <button>Submit</button>
            </form>
          )}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} videoId={videoId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
