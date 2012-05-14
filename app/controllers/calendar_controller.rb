class CalendarController < ConcertsController

    def index
        @concerts = Concert.all
        @date = params[:month] ? Date.parse(params[:month]) : Date.today
    end

end

