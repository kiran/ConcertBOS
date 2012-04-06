class ArtistsController < ApplicationController
  # GET /artists
  # GET /artists.json
  def index
    @artists = Artist.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @artists }
    end
  end

  # GET /artists/1
  # GET /artists/1.json
  def show
    @artist = Artist.find(params[:id])
    debugger

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @artist }
    end
  end
end
