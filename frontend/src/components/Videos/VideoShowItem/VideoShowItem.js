import { Link } from "react-router-dom";
import "../VideoIndex/VideoList.css";
import "./VideoShowItem.css";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
function VideoShowItem({ video }) {
  const sessionUser = useSelector((state) => state.session.user);


  return (
    // <li>
    //   <h2>{video.title}</h2>
    //   <Link to={`/videos/${video.id}`}>
    //     View Video
    //   </Link>
    // </li>
    <div className="video-container">
      <div className="video-thumbnail" href="#">
        <img src={videoImg3} alt="Video thumbnail" />
      </div>
      <div className="video-details">
        <div className="video-channel">
          {/* <Avatar
            name={sessionUser.username}
            size="35"
            round={true}
            color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
          /> */}
        </div>
        <h3 className="video-title">
          <span>Video title</span>
        </h3>
      </div>
    </div>
  );
}

export default VideoShowItem;
