FactoryBot.define do
  factory :user do
    email {Faker::Internet.free_email}
    password              "asdfasdfasdf"
    password_confirmation "asdfasdfasdf"
  end
end
