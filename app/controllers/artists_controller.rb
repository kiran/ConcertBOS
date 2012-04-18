class ArtistsController < ApplicationController
  # GET /artists
  # GET /artists.json
  def index
    @artists = Artist.all

    respond_to do |format|
      format.html # index.html.erb
      format.json {render :json => @artists }
    end
  end

  # GET /artists/1
  # GET /artists/1.json
  def show
    @artist = Artist.find(params[:id])
    debugger

    respond_to do |format|
      format.html # show.html.erb
      format.json {render :json => @artist }
    end
  end

  def _expand(levels,depth,maxBranch=5,dontExpand={})
        return  levels if depth==1 or levels=={}
        levels.each do |artistName,simhash|
            artist = Rockstar::Artist.new artistName
            #dontExpand[artist.name]=0
            artist.similar.slice(0,maxBranch).each do |sim| #seed levels[thisartist]
                    unless dontExpand.include? sim.name
                        simhash[sim.name] ={}
                    end
             end
             simhash = _expand(simhash,depth-1,maxBranch,dontExpand)
        end
        return levels
    end

    def getSimilar(seed = ["Nada Surf","White Rabbits", "Childish Gambino", "deadmau5", "Porcupine Tree"])

        levels = {} #change for actuall implementation to get who you listen to
        seed.each do |artistName|
            levels[artistName]={}
        end
        @similar = _expand(levels,2).to_json
        respond_to do |format|
            format.json {render :json => @similar }
        end
    end
end

