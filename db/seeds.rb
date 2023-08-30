require "open-uri"

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

  puts "creating video for demo user..."

  video = Video.create!({
    title: Faker::Book.title,
    description: Faker::Lorem.paragraph,
    author_id: demo_user.id
  })

  video.video.attach(
    io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_1.mp4").open,
    filename: "video_1.mp4"
  )

  puts "Creating more users and videos..."

  video_index = 2

  19.times do  # Adjusted from 8 to 19 iterations
    user = User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'somepassword',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    })

    video = Video.create!({
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph,
      author_id: user.id
    })

    video.video.attach(
      io: URI.parse("https://my-gluetube-seeds.s3.amazonaws.com/video_#{video_index}.mp4").open,
      filename: "video_#{video_index}.mp4"
    )

    video_index += 1
  end

  puts "Creating comments..."

  Video.all.each do |video|
    7.times do
      user = User.all.sample
      comment_body = Faker::Lorem.sentence
      Comment.create!(
        body: comment_body,
        author_id: user.id,
        video_id: video.id,
        parent_id: nil
      )
    end
  end

  puts "Done!"
end

