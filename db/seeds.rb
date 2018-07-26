# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

if Rails.env.development?

  users = []
  calendars = []
  events = []
  
  users << User.create(email: "test@test.com", password: "123456", password_confirmation: "123456")
  
  5.times do |i|
    calendars << Calendar.create(
        title: Faker::Hobbit.character,
        public: Faker::Boolean.boolean, 
        user: users.sample
    )
  end

  10.times do |i|
    events << Event.create(
        title: Faker::StarWars.character,
        start: Faker::Time.between(2.days.ago, Date.today, :afternoon), 
        allDay: Faker::Boolean.boolean,
        calendar: calendars.sample
    )
  end

end
