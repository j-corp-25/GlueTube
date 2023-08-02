import { Link } from "react-router-dom";
import "../VideoIndex/VideoList.css";
import "./VideoShowItem.css";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import videoImg1 from "../../../assets/Video_Image_1.jpeg";
// import videoImg2 from "../../../assets/Video_Img_2.jpeg";
// import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
function VideoShowItem({ video }) {
  const videoId = useParams().videoId;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  let hoverTimeout;
  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setIsPlaying(true);
      setIsControlsVisible(true);
    }, 300); // 300ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setIsPlaying(false);
      setIsControlsVisible(false);
    }, 300); // 300ms delay
  };
  // const videoObj = useSelector((state) => state.videos[videoId]);
  // console.log("Video:", video);
  // console.log("Users:", users);
  const author = video.author;
  // console.log("Author ID:", video.authorId);
  // console.log("Users:", users);
  // // Continue with rendering...

  return (
    <>
      <div className="video-container-feed">
        <div
          className="video-thumbnail-feed"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/videos/${video.id}`}></Link>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player'"
              width="340px"
              height="190px"
              controls={isControlsVisible}
              url={video.videoUrl}
              muted={true}
              playing={isPlaying}
              // config={{
              //   youtube: {
              //     playerVars: {
              //       showinfo: 1,
              //     },
              //     events: {
              //       onReady: onPlayerReady,
              //       onStateChange: onPlayerStateChange,
              //     },
              //   },
              // }}
            />
          </div>
        </div>
        <div className="video-details">
          <div className="video-channel">
            <Avatar
              name={author ? author.username : ""}
              size="35"
              round={true}
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
            />
          </div>
          <h3 className="video-title">
            <span>{video.title}</span>
          </h3>
        </div>
      </div>
    </>
  );
}

export default VideoShowItem;
