# json.extract! @video, :id, :title, :description, :author_id
# json.set! :author, @video.author.slice(:id, :username)
# json.videoUrl @video.video.attached? ? @video.video.url : nil

# # Add this line to include the video file's URL
# json.set! :url, @video.video.attached? ? Rails.application.routes.url_helpers.rails_blob_url(@video.video, host: 'localhost:3000') : nil

# json.video do
#   json.set! @video.id do
#     json.partial! "video", video: @video
#     json.comment_ids @video.comments.order("created_at DESC").pluck(:id)
#   end
# end

# json.comments do
#   @video.comments.each do |comment|
#     json.set! comment.id do
#       json.extract! comment, :id, :body, :author_id, :video_id , :created_at, :updated_at
#       json.author comment.author.username
#     end
#   end
# end


json.video do
  json.set! @video.id do
    json.partial! "api/videos/video", video: @video # Fixed path to the partial
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



# video: {
#   video: {
#     1: {
#       id: 1,
#       title: "Video Title",
#       url: "http://example.com/video.mp4",
#       description: "Video Description",
#       comment_ids: [7, 6, 5],
#     }
#   }
#   comments: {
#     5: {
#       id: 5,
#       video_id: 1,
#       body: "Comment Body",
#       author_id: 1,
#       author: {
#         id: 1,
#         username: "Author Username"
#       }
#     }
#     6: {
#       id: 6,
#       video_id: 1,
#       body: "Comment Body",
#       author_id: 1,
#       author: {
#         id: 1,
#         username: "Author Username"
#       }
#     }
#     7: {
#       id: 7,
#       video_id: 1,
#       body: "Comment Body",
#       author_id: 1,
#       author: {
#         id: 1,
#         username: "Author Username"
#       }
#     }
#   }
# }
