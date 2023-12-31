import { useState, useEffect } from "react";
import "./VideoForm.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DotSpinner } from "@uiball/loaders";
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
  const [fileError, setFileError] = useState(null);
  const formType = videoId ? "Update" : "Upload";
  const [message, setMessage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      // If dropped items are files
      if (e.dataTransfer.items[0].kind === "file") {
        const file = e.dataTransfer.items[0].getAsFile();
        setVideoFile(file);
      }
    }
  };

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
    } else if (title.trim().length > 80) {
      setTitleError("Title must be less than 80 characters.");
      errors = true;
    } else {
      setTitleError(null);
    }

    if (formType === "Upload" && videoFile === null) {
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
      if (videoFile !== null) {
        formData.append("video[video]", videoFile);
      }

      try {
        if (formType === "Update") {
          formData.append("video[id]", videoId);
          await dispatch(updateVideo(formData));
          history.push(`/videos/${videoId}`);
        } else {
          const newVideo = await dispatch(createVideo(formData));
          history.push(`/videos`);
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
    <form className="video-upload-form" onSubmit={handleSubmit}>
      <div className="video-page-form-container">
        <div className="video-form-header">
          <h1 className="form-title">{formType} Video</h1>
          <div className="step-container"> </div>
        </div>
        <div className="video-form-container">
          <div className="thumbnail-upload-section">
            <label
              htmlFor="file-upload"
              className="custom-file-upload"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {videoFile ? (
                <img src={URL.createObjectURL(videoFile)} alt="thumbnail" />
              ) : (
                "+ Drag and drop video files to upload"
              )}

            {message && <div className="error-message">{message}</div>}

            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <div className="supported-formats">
              Supported formats: .MP4, .MOV, .AVI, etc.
            </div>
            <div> Hey {sessionUser.username}</div>
            <br />
            <div>
              {formType === "Update" && (
                <div>
                  Your <b>original</b> video file is selected by default. Drag a new
                  video if you want to change your video
                </div>
              )}

              {formType === "Upload" && (
                <div>
                  Please drag/drop a video file to upload your video and it will
                  be on its way to the internet! 😮
                </div>
              )}

              <br />
            </div>
            <br />
          </div>
          <div className="video-details-section">
            <label className="video-upload-form-label">
              Title
              <input
                type="text"
                value={title}
                name="title"
                placeholder="Enter Video Title"
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
                placeholder="Enter Video Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError(null);
                }}
                className="video-form-textarea"
              />
              {descriptionError && (
                <div className="error-message">{descriptionError}</div>
              )}
            </label>
          </div>

          <div className="video-upload-footer">
            <button className="cancel-button-form" type="button" onClick={() => history.goBack()}>
              Cancel
            </button>
            <button className="submit-button-form" type="submit">{formType} Video</button>
          </div>
        </div>
      </div>
    </form>
  );
}
