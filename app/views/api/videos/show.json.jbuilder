# json.extract! @video, :id, :title, :description, :author_id
# json.set! :author, @video.author.slice(:id, :username)
# json.videoUrl @video.video.attached? ? @video.video.url : nil

# # Add this line to include the video file's URL
# json.set! :url, @video.video.attached? ? Rails.application.routes.url_helpers.rails_blob_url(@video.video, host: 'localhost:3000') : nil
json.video do
  json.set! @video.id do
    json.partial! "video", video: @video
  end
end
json.comments do
  @video.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :author_id, :video_id
      json.author comment.author.username
    end
  end
end
