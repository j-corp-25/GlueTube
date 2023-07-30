json.extract! comment, :id, :body, :video_id, :author_id, :created_at, :updated_at
json.replies comment.replies, partial: 'comment', as: :comment
json.author do
  json.id comment.author.id
  json.username comment.author.username
  # Include other attributes of the author as needed
end
