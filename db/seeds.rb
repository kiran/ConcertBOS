# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# example reading a line from a file
Venue.delete_all
open("db/seeds/venues.csv") do |groups|
    groups.read.each_line do |group|
        next if group.empty?
        name,address,capacity,phone,hours,seating = group.chomp.split(",")
        Venue.create!(:name=>name, :address=>address, :capacity=>capacity, :phone=>phone, :hours=>hours, :seating=>seating)
    end
end

