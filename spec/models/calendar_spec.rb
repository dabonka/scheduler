require 'rails_helper'

RSpec.describe Calendar, type: :model do
  describe "Validations" do
    it "has a valid factory" do
      calendar = create(:calendar)
      expect(calendar).to be_valid
    end

    it "is not valid without a title" do
      calendar = Calendar.new(title: nil)
      expect(calendar).to_not be_valid
    end
  end

  describe "Associations" do
    it "belongs_to user" do
      assc = described_class.reflect_on_association(:user)
      expect(assc.macro).to eq :belongs_to
    end
  end
end