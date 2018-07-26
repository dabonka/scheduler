FactoryBot.define do
  factory :calendar do
    title {Faker::Hobbit.character }
    public {Faker::Boolean.boolean }
    association :user, factory: :user
  end
end