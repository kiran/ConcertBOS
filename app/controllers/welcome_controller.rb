class WelcomeController < ApplicationController
    layout 'landing'

    def start
      User.destroy_all
      user = User.new("username" => 'default')
      user.save
    end


end

