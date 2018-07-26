class Event < ApplicationRecord
  belongs_to :calendar
  validates :title, presence: true
  validates :start, presence: true
end
