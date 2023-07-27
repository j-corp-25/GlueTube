import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideo, getVideo } from "../../../store/videos";
import NavBar from "../../NavBar/NavBar";
import "./VideoShow.css";
// import VideoList from "../VideoIndex/VideoList";
import videoImg34 from "../../../assets/Video_Image_1.jpeg";

const VideoShow = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => getVideo(videoId)(state));

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  console.log(video);

  if (!video) {
    return <div>Loading...</div>;  // show a loading state
  }

  return (
    <div className="main-show-page">
      <NavBar />
      <div className="video-container-show">
        <div className="video-player-container">
          <div className="video-player">
            <img className="show-image"src={videoImg34} alt="Video Placeholder" />
          </div>
          <div className="video-information">
            <h1>{video.title}</h1>
            <p>{video.description}</p>
          </div>
        </div>
        <div className="side-bar-container">
          <div className="side-bar">{/* <VideoList/> */}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoShow;
