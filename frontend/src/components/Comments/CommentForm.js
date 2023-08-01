import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideoComment } from '../../store/comments';

function CommentForm({ videoId }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body !== '') {
      dispatch(createVideoComment(videoId, body, user.id));
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
