# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  author_id  :bigint
#  video_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :video
end
