require "open-uri"
require 'faker'

ActiveRecord::Base.transaction do
  puts "Destroying tables..."

  User.destroy_all

  puts "Resetting primary keys..."

  ActiveRecord::Base.connection.reset_pk_sequence!("users")

  puts "Creating demouser"

  demo_user = User.create!(
    username: 'demouser',
    email: 'demo@user.io',
    password: 'password1',
    first_name: 'demo',
    last_name: 'user'
  )

  puts "Seed data created successfully!"
end
