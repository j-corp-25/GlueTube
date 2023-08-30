import React from "react";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import "./VideoList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoForm from "../VideoForm/VideoForm";
import VideoShowItem from "../VideoShowItem/VideoShowItem";
import { getVideos, fetchVideos } from "../../../store/videos";



const VideoList = ({searchResults}) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => getVideos(state));
  const items = searchResults || videos;
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);
  return (
    <>
      {videos && (
        <section className="video-grid">
          {items.map((video) => (
            <VideoShowItem key={video.id} video={video} />
          ))}
        </section>
      )}
    </>
  );
};

export default VideoList;
