import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteVideo, fetchVideo, getVideo } from '../../../store/videos'
import NavBar from '../../NavBar/NavBar'
import './VideoShow.css'
import VideoShowItem from '../VideoShowItem/VideoShowItem'
import { getVideos } from '../../../store/videos'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Comments from '../../Comments/Comments'
import { useHistory } from 'react-router-dom'
import Avatar from 'react-avatar'
import { useState } from 'react'
import { fetchVideos } from '../../../store/videos'
const VideoShow = () => {
  const dispatch = useDispatch()
  const { videoId } = useParams()
  const videos = useSelector(getVideos)
  const video = useSelector((state) => getVideo(videoId)(state))
  const sessionUser = useSelector((state) => state.session.user)
  const [showDescription, setShowDescription] = useState(false)

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  // const comments = useSelector(state => state.comments);

  const history = useHistory()

  const limitedVideos = videos.slice(0, 5)

  useEffect(() => {
    dispatch(fetchVideo(videoId))
  }, [dispatch, videoId])

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(deleteVideo(video.id))
    await dispatch(fetchVideos()) // Refetch the videos
    history.push('/')
  }

  if (!video) {
    return <div className='loading-stage'>Loading...</div>
  }

  if (sessionUser?.id === video.authorId) {
    return (
      <>
        {/* {Comments && ( */}

        <NavBar />
        <div className='video-page-container-show '>
          <div className='video-player-container mx-5'>
            <div className=' mb-5 mr-10 flex flex-row justify-end '>
              <div>
                <Link
                  to={`/videos/${video.id}/edit`}
                  className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 border inline-block text-center'
                >
                  Edit
                </Link>
              </div>
              <button
                onClick={handleDelete}
                className=' border bg-red-500 text-white py-2 px-4 ml-4 rounded hover:bg-red-700 transition duration-300'
              >
                Delete
              </button>
            </div>
            <div className='player-wrapper-show mx-8'>
              <ReactPlayer
                className='react-player-show mx-2'
                width='100%'
                height='100%'
                controls={true}
                url={video.videoUrl}
              />
            </div>
            <div className='video-information ml-10'>
              <div className='video-information '>
                <h1 className='video-title'>{video.title}</h1>
                <div className='video-author-container'>
                  <Avatar
                    name={video.author.username}
                    size='35'
                    round={true}
                    color={Avatar.getRandomColor('sitebase', [
                      'red',
                      'green',
                      'blue',
                    ])}
                  />
                  <span className='video-author-username'>
                    {video.author.username}
                  </span>
                </div>
                <div className='video-description-container mr-10'>
                  {/* <button
                  className={
                    showDescription
                      ? "description-toggle-less"
                      : "description-toggle-more"
                  }
                  onClick={toggleDescription}
                >
                  {showDescription ? "Show Less" : "Show More"}
                </button> */}
                  <p
                    className='video-description'
                    // style={{ display: showDescription ? "block" : "none" }}
                  >
                    {video.description}
                  </p>
                </div>
                <Comments videoId={videoId} />
              </div>
            </div>
          </div>
          <div className='flex hidden md:inline-block md:flex-col'>
            <div className='side-bar-title-container'>
              <p className='side-bar-title'></p>
            </div>
            <div className='side-bar'>
              {limitedVideos.map((video) => (
                <VideoShowItem key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>

        {/* )} */}
      </>
    )
  }
  return (
    <>
      <NavBar />
      <div className='video-page-container-show'>
        <div className='video-player-container mx-8'>
          <div className='player-wrapper-show mx-2'>
            <ReactPlayer
              className='react-player-show mx-8'
              width='100%'
              height='100%'
              controls={true}
              url={video.videoUrl}
            />
          </div>

          <div className='video-information ml-20'>
            <h1 className='video-title'>{video.title}</h1>
            <div className='video-author-container mx-2'>
              <Avatar
                name={video.author.username}
                size='35'
                round={true}
                color={Avatar.getRandomColor('sitebase', [
                  'red',
                  'green',
                  'blue',
                ])}
              />
              <span className='video-author-username'>
                {video.author.username}
              </span>
            </div>
            <div className='video-description-container mx-5'>
              {/* <button
                  className={
                    showDescription
                      ? "description-toggle-less"
                      : "description-toggle-more"
                  }
                  onClick={toggleDescription}
                >
                  {showDescription ? "Show Less" : "Show More"}
                </button> */}
              <p
                className='video-description'
                // style={{ display: showDescription ? "block" : "none" }}
              >
                {video.description}
              </p>
            </div>
            <Comments videoId={videoId} />
          </div>
        </div>
        <div className='flex hidden md:inline-block md:flex-col'>
          <div className='side-bar-title-container'>
            <p className='side-bar-title'></p>
          </div>
          <div className='side-bar'>
            {limitedVideos.map((video) => (
              <VideoShowItem key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>

      {/* )} */}
    </>
  )
}

export default VideoShow
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
