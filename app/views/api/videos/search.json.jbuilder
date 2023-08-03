json.videos({})
json.videos do
  @videos.each do |video|
    json.set! video.id do
      json.extract! video, :id, :title, :description, :created_at, :updated_at
    end
  end
end
