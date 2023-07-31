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
import ReactPlayer from "react-player";
import Comments from "../../Comments/Comments";
import { clearComments } from "../../../store/comments";
import { fetchComments } from "../../../store/comments";

import { useHistory } from "react-router-dom";

const VideoShow = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const videos = useSelector(getVideos);
  const video = useSelector((state) => getVideo(videoId)(state));
  const sessionUser = useSelector((state) => state.session.user);
  // const comments = useSelector(state => state.comments);

  const history = useHistory();

  const limitedVideos = videos.slice(0, 15);

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);


  // useEffect(() => {
  //   dispatch(fetchVideos());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(clearComments());
  //   dispatch(fetchComments(videoId));
  // }, [dispatch, videoId]);

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteVideo(video.id));
    history.push("/");
  }

  if (!video) {
    return <div>Loading...</div>; // show a loading state
  }


  // console.log(sessionUser?.id);
  // console.log(video.authorId);

  if (sessionUser?.id === video.authorId) {
    return (
      <>
      <div className="main-show-page">
        <NavBar />
        <div className="video-page-container-show">
          <div className="video-player-container">
            <button>
              <Link to={`/videos/${video.id}/edit`}>Edit</Link>
            </button>

            <button onClick={handleDelete}>Delete</button>
            <div className="video-player">
              <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                url={video.videoUrl}
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
        <Comments videoId={videoId} />
      </div>


      </>
    );
  }
  return (
    <div className="main-show-page">
      <NavBar />
      <div className="video-page-container-show">
        <div className="video-player-container">
          <div className="video-player">
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              url={video.videoUrl}
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
      <Comments videoId={videoId} />
    </div>
  );
};

export default VideoShow;
    // useEffect(() => {
    //   if (!video) {
    //     dispatch(fetchVideo(videoId));
    //   }
    // }, [dispatch, videoId, video]);

    //this will stop constantly fetching the videos for the index page when the page loads, but you need  uncomment the functions above to do this if you want to fetch the videos for the index page when the page loads
    // useEffect(() => {
    //   if (!videos.length) {
    //     dispatch(getVideos());
    //   }
    // }, [dispatch, videos]);
