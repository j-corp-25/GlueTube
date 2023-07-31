import { Link } from "react-router-dom";
import "../VideoIndex/VideoList.css";
import "./VideoShowItem.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
function VideoShowItem({ video }) {
  const videoId = useParams().videoId;
  // const videoObj = useSelector((state) => state.videos[videoId]);
  // console.log("Video:", video);
  // console.log("Users:", users);
  const author = video.author
  // console.log("Author ID:", video.authorId);
  // console.log("Users:", users);
  // // Continue with rendering...

  return (
    <div className="video-container">
      <div className="video-thumbnail" href="#">
        <Link to={`/videos/${video.id}`}>
          <ReactPlayer url={video.videoUrl} />
        </Link>
      </div>
      <div className="video-details">
        <div className="video-channel">
          <Avatar
            name={author ? author.username : ""}
            size="35"
            round={true}
            color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
          />
        </div>
        <h3 className="video-title">
          <span>{video.title}</span>
        </h3>
      </div>
    </div>
  );
}

export default VideoShowItem;
