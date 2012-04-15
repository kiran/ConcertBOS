class Concert < ActiveRecord::Base
  belongs_to :artist
  accepts_nested_attributes_for :artist

  belongs_to :venue
  accepts_nested_attributes_for :venue

  attr_accessible :date, :artist, :venue, :over18, :over21, :price

  validates_presence_of :date, :artist, :venue, :price

  has_many :users, :through => :concertsusers
end

