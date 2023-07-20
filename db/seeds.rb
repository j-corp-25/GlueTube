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

  michasel = User.create!(username: "bigPapimario", password: "password")
  paul = User.create!(username: "imchillin", password: "password")
  christian = User.create!(username: "PopeyeLifeHacks", password: "password")
  maggie = User.create!(username: "Mrbeast", password: "password")
  darwin = User.create!(username: "darude", password: "password")
  dieseltruck = User.create!(username: "dididexter", password: "password")
  tylor = User.create!(username: "TheRobinsonFamily", password: "password")
  dismae = User.create!(username: "dizzzzzznutbar", password: "password")
end
