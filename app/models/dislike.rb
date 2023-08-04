# == Schema Information
#
# Table name: dislikes
#
#  id         :bigint           not null, primary key
#  author_id  :bigint
#  video_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Dislike < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :video
end
