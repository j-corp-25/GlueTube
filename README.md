# GlueTube
## [GlueTube Live on Render](https://mygluetube.onrender.com)

# Description
This project is a video platform that allows users to view, create, update, and delete `videos`. Users can also add, edit, and delete `comments` on videos. Users can also search for videos by title.

# Technology
- React
- Redux
- JavaScript
- CSS
- Additional libraries: react-router-dom, react-avatar and react-player

# Features



- Video Viewing: Users can browse and view videos.

![Video Viewing](./frontend/public/7us04a.gif)

- Video Management: Authorized users can create, update, and delete videos.


- Comments: Users can add comments to videos, edit their own comments, and delete them.

- Authentication: Users must be logged in to create videos and comments.

![User Authentication](./frontend/public/Screenshot%202023-08-04%20at%204.52.34%20PM.png)

---

![User Authentication](./frontend/public/Screenshot%202023-08-04%20at%204.52.49%20PM.png)

---

![User Authentication](./frontend/public/Screenshot%202023-08-04%20at%204.53.06%20PM.png)
# Components

## Videos
- VideosList: Component to display a list of videos.

- VideoShowPage: Component to display a single video along with its comments.

- VideoForm: Component for creating and updating videos.
Comments

## Comments
- Comments: Main component to display comments and the comment creation form.

- Comment: Single comment component, with edit and delete options.


## Video Display Page

![Video Display Page](./frontend/public/Screenshot%202023-08-04%20at%205.04.01%20PM.png)


## Video Show Page

![Video Show Page](./frontend/public/Screenshot%202023-08-04%20at%205.05.33%20PM.png)
# Code Snippets

#### Comment snippet for comment form and displaying comments on the video show page

``` javascript
const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  function handleEdit(e) {
    e.preventDefault();
    dispatch(updateComment(comment.id, { body: editText }));
    setIsEditing(false);
  }
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteComment(id));
    } else {
      console.error("Comment ID is undefined");
    }
  };
  return (
    <div className="comment-container">
      <div className="profile-icon-container">
        <Avatar
          name={comment.author}
          size="35"
          round={true}
          color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
        />
      </div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={(e) => handleEdit(e)}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <div className="comment-content">
          <div className="comment-author">{comment.author}</div>
          <p className="comment">{comment.body}</p>
          {sessionUser?.id === comment.authorId && (
            <div className="comment-options">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const [newComment, setNewComment] = useState("");
  const video = useSelector((state) => state.videos[videoId]);
  const commentIds = video.commentIds;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideoComment(videoId, { body: newComment }, sessionUser.id));
    setNewComment("");
  };

  const handleEdit = (id, text) => {
    dispatch(updateComment(id, { body: text }));
  };

  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  let sortedComments = [];


  if (video && video.commentIds) {
    sortedComments = video.commentIds.map((id) => comments[id]).filter(Boolean);
  }

  return (
    <>
      {comments && (
        <div className="comment-container-show-page">
          <h1 className="comment-title">Comments</h1>
          <div className="comment-container-show-page-comments">
            <div className="comment-container-show-page-comments-comment">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={
                    sessionUser
                      ? "Write a comment..."
                      : "You need to be logged in to comment"
                  }
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!sessionUser}
                />
                <button className="submit-container" disabled={!sessionUser}>
                  Submit
                </button>
              </form>

              {sortedComments.map((comment) => (
                <div key={comment.id}>
                  <Comment
                    comment={comment}
                    videoId={videoId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
```
## Video Controllers


``` ruby
class Api::VideosController < ApplicationController
  wrap_parameters include: Video.attribute_names + [:video]
  before_action :require_login, only: [:create, :update, :destroy]

  def index
    @videos = Video.all.sort { |b, a| b.created_at <=> a.created_at }
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end

  def create
    @video = current_user.videos.new(video_params)
    if @video.save
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @video = current_user.videos.find(params[:id])

    if @video.update(video_params)
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @video = current_user.videos.find(params[:id])
    @video.destroy
    render :show
  end

  def search
    query = params[:query]
    @videos = Video.where("title ILIKE ? OR description ILIKE ?", "%#{query}%", "%#{query}%")
    render :search
  end

  private

  def video_params
    params.require(:video).permit(:id,:title, :description, :video)
  end
end


```

## JBuilder views for video#show route

```ruby
json.video do
  json.set! @video.id do
    json.partial! "api/videos/video", video: @video
    json.comment_ids @video.comments.order("created_at DESC").pluck(:id)
  end
end

json.comments do
  @video.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :author_id, :video_id , :created_at, :updated_at
      json.author comment.author.username
    end
  end
end
```
