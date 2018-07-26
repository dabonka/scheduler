require 'rails_helper'

RSpec.describe Event, type: :model do
  describe "Validations" do
    it "has a valid factory" do
      event = create(:event)
      expect(event).to be_valid
    end

    it "is not valid without a title" do
      event = Event.new(title: nil)
      expect(event).to_not be_valid
    end

    it "is not valid without a start date" do
      event = Event.new(start: nil)
      expect(event).to_not be_valid
    end
  end

  describe "Associations" do
    it "belongs_to calendar" do
      assc = described_class.reflect_on_association(:calendar)
      expect(assc.macro).to eq :belongs_to
    end
  end
end
