class Concert < ActiveRecord::Base
  attr_accessible :date, :artists, :venue, :over18, :over21, :price
  validates_presence_of :date, :artists, :venue, :price

  has_and_belongs_to_many :artists
  accepts_nested_attributes_for :artists

  belongs_to :venue
  accepts_nested_attributes_for :venue

  has_many :users, :through => :concerts_users
end

