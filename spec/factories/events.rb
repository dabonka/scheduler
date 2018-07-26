FactoryBot.define do
  factory :event do
    title {Faker::StarWars.character }
    allDay {Faker::Boolean.boolean }
    start {Faker::Time.between(2.days.ago, Date.today, :afternoon) } 
    url {Faker::Team.state }
    association :calendar, factory: :calendar
  end
end
