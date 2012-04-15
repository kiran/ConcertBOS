class ConcertsUser < ActiveRecord::Base
  attr_accessible :concert_id, :user_id
  
  validates_uniqueness_of :concert_id, :scope => :user_id
end
