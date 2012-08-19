class User < ActiveRecord::Base
  include Services
  attr_accessible :username

  has_and_belongs_to_many :artists
  has_many :concerts, :through => :concerts_users

# Get information for this user.
  def gather_info
    top_artists_data, friends_data = {}, {}
    top_artists = Thread.new { top_artists_data = Lastfm.get_top_artists(username) }
    friends = Thread.new { friends_data = Lastfm.get_friends(username) }
    [top_artists, friends].each { |t| t.join }

    puts "Top Artists:"
    top_artists_data['topartists']['artist'].each { |artist| puts "\t#{artist['name']}" }

    puts "Friends:"
    friends_data['friends']['user'].each {|friend| puts "\t#{friend['name']}" }
    save
  end



end

