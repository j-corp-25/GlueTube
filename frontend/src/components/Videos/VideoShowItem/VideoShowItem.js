import { Link } from 'react-router-dom';
import "../VideoIndex/VideoList.css";
import "./VideoShowItem.css"
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";


function VideoShowItem({ video }) {
  return (
    // <li>
    //   <h2>{video.title}</h2>
    //   <Link to={`/videos/${video.id}`}>
    //     View Video
    //   </Link>
    // </li>

    <div className="video-container">
      <div className="video-info-container">
        <div className="video-thumbnail-container">
          <figure>
            <img
              className="videoThumbnail"
              src={videoImg1}
              alt="thumbnail"
            ></img>
          </figure>
        </div>
        <div className="thumb-nail-info">
          <h4>{video.title}</h4>
          {/* <h5>Description: {video.description}</h5> */}
          <Link to={`/videos/${video.id}`}>View Video</Link>
        </div>
      </div>
    </div>
  );
}

export default VideoShowItem;
