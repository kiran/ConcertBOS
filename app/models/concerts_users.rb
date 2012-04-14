class ConcertsUsers < ActiveRecord::Base
  attr_accessible :concert_id, :user_id
end
