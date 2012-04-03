class Concert < ActiveRecord::Base
  belongs_to :artist
  accepts_nested_attributes_for :artist

  belongs_to :venue
  accepts_nested_attributes_for :venue

  attr_accessible :date, :artist, :venue

  validates_presence_of :date, :artist, :venue
end

