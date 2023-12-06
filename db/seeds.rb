require "open-uri"
require 'faker'

ActiveRecord::Base.transaction do
  puts "Destroying tables..."

  Comment.destroy_all
  Video.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."

  ActiveRecord::Base.connection.reset_pk_sequence!("comments")
  ActiveRecord::Base.connection.reset_pk_sequence!("videos")
  ActiveRecord::Base.connection.reset_pk_sequence!("users")

  puts "Creating demouser"

  demo_user = User.create!(
    username: 'demouser',
    email: 'demo@user.io',
    password: 'password1',
    first_name: 'demo',
    last_name: 'user'
  )

  puts "Creating video for demouser..."

  demo_video = Video.create!({
    title: Faker::Book.title,
    description: Faker::Lorem.paragraph,
    author_id: demo_user.id
  })

  demo_video.video.attach(
    io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_1.mp4").open,
    filename: "video_1.mp4"
  )

  # Create additional users with videos and comments
  5.times do |i|
    user = User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    })

    puts "Creating video for #{user.username}..."

    video = Video.create!({
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph,
      author_id: user.id
    })

    video.video.attach(
      io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_#{i + 2}.mp4").open,
      filename: "video_#{i + 2}.mp4"
    )

    # Create random comments for each video
    rand(5..10).times do
      Comment.create!(
        body: Faker::Lorem.sentence,
        author_id: User.all.sample.id,
        video_id: video.id
      )
    end
  end

  puts "Seed data created successfully!"
end
