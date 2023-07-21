# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#
class User < ApplicationRecord
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, allow_nil: true
  before_validation :ensure_session_token
  has_secure_password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user&.authenticate(password)
      return user
    else
      nil
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end

  private

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
end
