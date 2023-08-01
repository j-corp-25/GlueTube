import { useState, useEffect } from "react";
import "./VideoForm.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DotSpinner } from '@uiball/loaders'
import {
  getVideo,
  fetchVideo,
  createVideo,
  updateVideo,
} from "../../../store/videos";

export default function VideoForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const videoId = useParams().videoId;
  const video = useSelector((state) => getVideo(videoId)(state));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const formType = videoId ? "Update" : "Upload";
  const [message, setMessage] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideo(videoId));
    }
  }, [videoId, dispatch]);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
    }
  }, [video]);

  async function handleSubmit(e) {
    e.preventDefault();

    let errors = false;

    if (title.trim() === "") {
      setTitleError("Title is a required field.");
      errors = true;
    } else if (title.trim().length > 50) {
      setTitleError("Title must be less than 50 characters.");
      errors = true;
    } else {
      setTitleError(null);
    }

    if (videoFile === null) {
      setMessage("Please select a video file.");
      errors = true;
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required.");
      errors = true;
    } else {
      setDescriptionError(null);
    }

    if (!errors) {
      const formData = new FormData();
      formData.append("video[title]", title);
      formData.append("video[description]", description);
      formData.append("video[video]", videoFile);

      try {
        if (formType === "Update") {
          formData.append("video[id]", videoId);
          await dispatch(updateVideo(formData));
        } else {
          await dispatch(createVideo(formData));
        }
        setMessage(`${formType} Successful!`);
        setTitle("");
        setDescription("");
      } catch (err) {
        setMessage(`${formType} Failed!`);
      }
    }
  }
  return (
    <div className="video-page-form-container">
      <div className="video-form-container">
        <form className="video-upload-form" onSubmit={handleSubmit}>
          <h1 className="video-form-title">{formType} Video</h1>
          <label className="video-upload-form-label">
            Title
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(null);
              }}
              className="video-form-input"
            />
            {titleError && <div className="error-message">{titleError}</div>}
          </label>

          <label className="video-upload-form-label">
            Description
            <textarea
              value={description}
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(null);
              }}
              className="video-form-textarea"
            />
            {descriptionError && (
              <div className="error-message">{descriptionError}</div>
            )}
            <div>{message}</div>
          </label>

          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          <input type="submit" value={`${formType} Video`} />
        </form>
      </div>
    </div>
  );
}
