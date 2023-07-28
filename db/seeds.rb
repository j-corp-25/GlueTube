require "open-uri"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
## This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
## This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

ActiveRecord::Base.transaction do
  puts "Destroying tables..."

  User.destroy_all
  Video.destroy_all

  puts "Resetting primary keys..."

  ActiveRecord::Base.connection.reset_pk_sequence!("users")
  ActiveRecord::Base.connection.reset_pk_sequence!("videos")

  puts "Creating users..."

  demo_user = User.create!(
    username: 'Demo-lition',
    email: 'demo@user.io',
    password: 'password',
    first_name: 'Demo',
    last_name: 'User'
  )

  # Create videos for demo user
  3.times do |i|
    video = Video.create!({
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph,
      author_id: demo_user.id
    })
    video.video.attach(
      io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_#{i + 1}.mp4").open,
      filename: "video_#{i + 1}.mp4"
    )
  end

  # More users
  3.times do
    user = User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    })

    # Create videos for each user
    2.times do |i|
      video = Video.create!({
        title: Faker::Book.title,
        description: Faker::Lorem.paragraph,
        author_id: user.id
      })
      video.video.attach(
        io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_#{i + 1}.mp4").open,
        filename: "video_#{i + 1}.mp4"
      )
    end
  end

  puts "Done!"
end
