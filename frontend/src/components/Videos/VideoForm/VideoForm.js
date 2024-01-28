import { useState, useEffect } from 'react'
import './VideoForm.css'
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DotSpinner } from '@uiball/loaders'
import {
  getVideo,
  fetchVideo,
  createVideo,
  updateVideo,
} from '../../../store/videos'

export default function VideoForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const videoId = useParams().videoId
  const video = useSelector((state) => getVideo(videoId)(state))
  const [title, setTitle] = useState('')
  const [fileTypeError, setFileTypeError] = useState(null)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [titleError, setTitleError] = useState(null)
  const [descriptionError, setDescriptionError] = useState(null)
  const formType = videoId ? 'Update' : 'Upload'
  const [message, setMessage] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const sessionUser = useSelector((state) => state.session.user)

  const allowedFileTypes = ['.mp4', '.mov']

  const handleFileChange = (e) => {
    setMessage(null)
    const file = e.target.files[0]
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase()
      if (!allowedFileTypes.includes('.' + fileExtension)) {
        setFileTypeError(
          'Unsupported file type. Please select a .MP4 or .MOV file.'
        )
        setVideoFile(null) 
      } else {
        setFileTypeError(null)
        setVideoFile(file)
      }
    }
  }
  useEffect(() => {
    if (video) {
      setTitle(video.title)
      setDescription(video.description)
    }
  }, [video])

  async function handleSubmit(e) {
    e.preventDefault()

    let errors = false

    if (title.trim() === '') {
      setTitleError('Title is a required field.')
      errors = true
    } else if (title.trim().length > 80) {
      setTitleError('Title must be less than 80 characters.')
      errors = true
    } else {
      setTitleError(null)
    }

    if (formType === 'Upload' && videoFile === null) {
      setMessage('Please select a video file.')
      errors = true
    } else {
      setMessage(null)
    }

    if (description.trim() === '') {
      setDescriptionError('Description is required.')
      errors = true
    } else {
      setDescriptionError(null)
    }

    if (!errors) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('video[title]', title)
      formData.append('video[description]', description)
      if (videoFile !== null) {
        formData.append('video[video]', videoFile)
      }

      try {
        if (formType === 'Update') {
          isLoading = false
          formData.append('video[id]', videoId)
          await dispatch(updateVideo(formData))
          isLoading = true
          history.push(`/videos/${videoId}`)
        } else {
          const newVideo = await dispatch(createVideo(formData))
          history.push(`/videos`)
        }
        setMessage(`${formType} Successful!`)
        setTitle('')
        setDescription('')
      } catch (err) {
        setMessage(`${formType} Failed!`)
      }
      setIsLoading(false)
    }
  }
  return (
    <form className='video-upload-form min-h-screen' onSubmit={handleSubmit}>
      <div className='video-page-form-container min-h-screen p-3'>
        <div className='flex justify-center text-4xl m-5 '>
          <h1 className=''>{formType} Video</h1>
        </div>
        <div className='video-form-container mx-5 p-5'>
          <div className='thumbnail-upload-section'>
            <Form>
              <Form.Group controlId='formVideoFile'>
                <Form.Label>Video File:</Form.Label>
                <Form.Control
                  type='file'
                  name='videoFile'
                  onChange={handleFileChange} // Updated handler
                />
              </Form.Group>
              {fileTypeError && (
                <div className='error-message mt-3'>{fileTypeError}</div>
              )}
              {message && <div className='error-message mt-3'>{message}</div>}

              <div className='supported-formats mt-3'>
                Supported formats: .MP4, .MOV,
              </div>

              <div className='mt-3'> Hey {sessionUser.username}</div>

              {formType === 'Update' && (
                <div className='mt-3'>
                  Your <b>original</b> video file is selected by default. Select
                  a new video file if you want to change your video.
                </div>
              )}

              {formType === 'Upload' && (
                <div className='mt-3'>
                  Please select a video file to upload your video and it will be
                  on its way to the internet! 😮
                </div>
              )}
            </Form>
          </div>
          <div className='video-details-section'>
            <label className='video-upload-form-label'>
              Title
              <input
                type='text'
                value={title}
                name='title'
                placeholder='Enter Video Title'
                onChange={(e) => {
                  setTitle(e.target.value)
                  setTitleError(null)
                }}
                className='video-form-input'
              />
              {titleError && <div className='error-message'>{titleError}</div>}
            </label>
            <label className='video-upload-form-label'>
              Description
              <textarea
                value={description}
                name='description'
                placeholder='Enter Video Description'
                onChange={(e) => {
                  setDescription(e.target.value)
                  setDescriptionError(null)
                }}
                className='video-form-textarea'
              />
              {descriptionError && (
                <div className='error-message'>{descriptionError}</div>
              )}
            </label>
          </div>

          <div className='video-upload-footer gap-5'>
            <button
              className='cancel-button-form'
              type='button'
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            {isLoading && (
              <div className=''>
                Your Video is being uploaded <DotSpinner />{' '}
              </div>
            )}

            <button
              className='submit-button-form w-[25%] p-1 w-auto'
              type='submit'
            >
              {formType} Video
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
