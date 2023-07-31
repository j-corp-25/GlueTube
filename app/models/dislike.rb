class Dislike < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :video
end
