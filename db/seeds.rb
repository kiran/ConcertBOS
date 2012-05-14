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

months = {'January'=>1, 'February'=>2, 'March'=>3, 'April'=>4, 'May'=>5, 'June'=>6, 'July'=>7, 'August'=>8, 'September'=>9, 'October'=>10, 'November'=>11, 'December'=>12}

Concert.delete_all
Artist.delete_all
open("db/seeds/concerts.csv") do |concerts|
    concerts.read.each_line do |concert|
      next if concert.empty?
      artist,venue,month,day,time,price,over18,over21 = concert.chomp.split(',')
      artist = Artist.create!(:name=>artist)
      venue = Venue.find_by_name(venue)
      date = '2012-'+months[month].to_s+'-'+day.to_s+' '+time
      Concert.create!(:artist=>artist, :venue=>venue, :price=>price, :over18=>over18, :over21=>over21, :date=>date)
    end
end

