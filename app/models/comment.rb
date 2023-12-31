# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  author_id  :bigint           not null
#  video_id   :bigint           not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
  belongs_to :author,
             foreign_key: :author_id,
             class_name: "User"

  belongs_to :video,
             foreign_key: :video_id,
             class_name: "Video"

  belongs_to :parent,
             class_name: "Comment",
             optional: true

  has_many :replies,
           class_name: "Comment",
           foreign_key: :parent_id,
           dependent: :destroy

  validates :author_id, presence: true
  validates :video_id, presence: true
  validates :body, presence: true
end
