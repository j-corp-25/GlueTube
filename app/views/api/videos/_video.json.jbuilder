

# json.extract! video, :id, :title, :description, :author_id


# json.url video.video.attached? ? Rails.application.routes.url_helpers.rails_blob_url(video.video, host: 'localhost:3000') : nil

json.extract! video, :id, :title, :description, :author_id, :created_at, :updated_at
json.videoUrl video.video.attached? ? video.video.url : nil
json.set! :author, video.author.slice(:id, :username)
