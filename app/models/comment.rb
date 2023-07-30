class Comment < ApplicationRecord
  belongs_to :author,foreign_key: :author_id, class_name: 'User'
  belongs_to :video, foreign_key: :video_id, class_name: 'Video'
  belongs_to :parent, class_name: 'Comment', optional: true
  has_many :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy
end
