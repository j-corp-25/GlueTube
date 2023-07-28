import React from "react";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import "./VideoList.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoForm  from '../VideoForm/VideoForm';
import VideoShowItem from '../VideoShowItem/VideoShowItem';
import { getVideos, fetchVideos } from '../../../store/videos';



const VideoList = () => {

  const dispatch = useDispatch();
  const videos = useSelector(getVideos);

  useEffect(() => {
      dispatch(fetchVideos());
  }, [dispatch])

  return (
    <section className="video-grid">
        {videos.map(video => <VideoShowItem key={video.id} video={video} />)}
    </section>

  );
};

export default VideoList;
