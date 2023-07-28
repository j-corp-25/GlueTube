json.extract! @video, :id, :title, :description, :author_id
json.set! :author, @video.author.slice(:id, :username)
