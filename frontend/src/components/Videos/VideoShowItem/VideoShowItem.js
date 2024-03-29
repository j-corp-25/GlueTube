import { Link } from "react-router-dom";
import "./VideoShowItem.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function VideoShowItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const viewCounts = [
    "20 million views",
    "10 thousand views",
    "5 thousand views",
    "1 million views",
    "50 million views",
    "2 million views",
    "100 thousand views",
    "500 thousand views",
    "30 million views",
    "15 thousand views",
    "200 thousand views",
    "3 million views",
    "40 thousand views",
    "25 million views",
    "7 thousand views",
    "800 thousand views",
    "4 million views",
    "60 thousand views",
    "35 million views",
    "9 thousand views",
  ];
  const [randomViewCount, setRandomViewCount] = useState(null);
  useEffect(() => {
    const randomView =
      viewCounts[Math.floor(Math.random() * viewCounts.length)];
    setRandomViewCount(randomView);
  }, []);

  let hoverTimeout;
  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setIsPlaying(true);
      setIsControlsVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setIsPlaying(false);
      setIsControlsVisible(false);
    }, 300);
  };

  const author = video.author;

  // // Continue with rendering...

  return (
    <>
      {/*  */}
      <div className=" video-container-feed">
        <Link className="link-wrapper" to={`/videos/${video.id}`}>
          <div
            className="video-thumbnail-feed border border-gray-200 shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="">
              <ReactPlayer
                width="100%"
                height="100%"
                className="react-player"
                controls={isControlsVisible}
                url={video.videoUrl}
                muted={true}
                playing={isPlaying}
              />
            </div>
          </div>
        </Link>
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
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <span className="video-author">{author.username}</span>
            <div className="video-stats">
              <span className="video-views">{randomViewCount} •</span>
              <span className="video-created">
                {formatDistanceToNow(new Date(video.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoShowItem;
