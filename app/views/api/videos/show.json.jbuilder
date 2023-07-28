json.extract! @video, :id, :title, :description, :author_id
json.set! :author, @video.author.slice(:id, :username)

# Add this line to include the video file's URL
json.set! :url, @video.video.attached? ? Rails.application.routes.url_helpers.rails_blob_url(@video.video, host: 'localhost:3000') : nil
