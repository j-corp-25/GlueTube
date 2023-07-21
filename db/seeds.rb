# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ActiveRecord::Base.transaction do
  User.destroy_all

  ActiveRecord::Base.connection.reset_pk_sequence!("users")

  puts "Creating users..."

  michael = User.create!(
    username: "bigPapimario",
    password: "password",
    first_name: "Michael",
    last_name: "Mario",
    email: "michael.mario@example.com"
  )

  paul = User.create!(
    username: "imchillin",
    password: "password",
    first_name: "Paul",
    last_name: "Chill",
    email: "paul.chill@example.com"
  )
end
