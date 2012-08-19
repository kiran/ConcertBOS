module Services
  module Lastfm
    extend Base

    URL = 'http://ws.audioscrobbler.com/2.0/?api_key=673381d2cccec81384bcdc2033508554&format=json'
    # Dig up the top 5 words in speeches by the politician over the course of the
    # last year.
    def self.get_top_artists(username)
      safe_request('get_top_artists') do
        #optional: &period=[overall | 7day | 1month | 3month | 6month | 12month]
        url = "#{URL}&method=user.gettopartists&user=#{username}"
        get_json(url)
      end
    end

    def self.get_friends(username)
      safe_request('get_friends') do
        url = "#{URL}&method=user.getfriends&user=#{username}"
        get_json(url)
      end
    end

    #getRecommendedArtists, getRecommendedEvents require authentication

    def self.get_events_in_location(location)
      safe_request('get_events_in_location') do
        url = "#{URL}&method=geo.getevents&location=#{location}"
        get_json(url)
      end
    end


  end
end