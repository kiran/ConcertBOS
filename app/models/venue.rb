class Venue < ActiveRecord::Base
  attr_accessible :address, :capacity, :hours, :name, :phone, :seating
  has_many :concerts
end

