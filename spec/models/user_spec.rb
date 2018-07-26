RSpec.describe User, type: :model do

  describe "Validations" do
    it "has a valid factory" do
      user = create(:user)
      expect(user).to be_valid
    end

    it "is not valid without a email" do
      user = User.new(email: nil)
      expect(user).to_not be_valid
    end
  end

  describe "Associations" do
    it "has many calendars" do
      assc = described_class.reflect_on_association(:calendars)
      expect(assc.macro).to eq :has_many
    end
  end
end