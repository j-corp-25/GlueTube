import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteVideo, fetchVideo, getVideo } from "../../../store/videos";
import NavBar from "../../NavBar/NavBar";
import "./VideoShow.css";
// import VideoList from "../VideoIndex/VideoList";
import videoImg34 from "../../../assets/Video_Image_1.jpeg";
import VideoShowItem from "../VideoShowItem/VideoShowItem";
import { getVideos, fetchVideos } from "../../../store/videos";
import * as sessionActions from "../../../store/session";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const VideoShow = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const videos = useSelector(getVideos);
  const video = useSelector((state) => getVideo(videoId)(state));
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const limitedVideos = videos.slice(0, 8);

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteVideo(video.id));
    history.push("/");
  }

  if (!video) {
    return <div>Loading...</div>; // show a loading state
  }

  console.log(sessionUser?.id);
  console.log(video.authorId);

  if (sessionUser?.id === video.authorId) {
    return (
      <div className="main-show-page">
        <NavBar />
        <div className="video-container-show">
          <div className="video-player-container">
            <button>
              <Link to={`/videos/${video.id}/edit`}>Edit</Link>
            </button>

            <button onClick={handleDelete}>Delete</button>
            <div className="video-player">
              <img
                className="show-image"
                src={videoImg34}
                alt="Video Placeholder"
              />
            </div>
            <div className="video-information">
              <h1>{video.title}</h1>
              <p>{video.description}</p>
            </div>
          </div>
          <div className="side-bar-container">
            <div className="side-bar-title-container">
              <p className="side-bar-title">Latest Videos</p>
            </div>
            <div className="side-bar">
              {limitedVideos.map((video) => (
                <VideoShowItem key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-show-page">
      <NavBar />
      <div className="video-container-show">
        <div className="video-player-container">
          <div className="video-player">
            <img
              className="show-image"
              src={videoImg34}
              alt="Video Placeholder"
            />
          </div>
          <div className="video-information">
            <h1>{video.title}</h1>
            <p>{video.description}</p>
          </div>
        </div>
        <div className="side-bar-container">
          <div className="side-bar">
            <div className="side-bar-title-container">
              <p className="side-bar-title">Latest Videos</p>
            </div>
            {limitedVideos.map((video) => (
              <VideoShowItem key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoShow;
