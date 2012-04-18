class ConcertsusersController < ApplicationController
  # GET /concertsusers
  # GET /concertsusers.json
  def index
    @concertsusers = ConcertsUser.all

    respond_to do |format|
      format.json { render :json => @concertsusers }
    end
  end

  # GET /concertsusers/1
  # GET /concertsusers/1.json
  def show
    @concertsuser = ConcertsUser.find(params[:id])

    respond_to do |format|
      format.json { render :json => @concertsuser }
    end
  end

  # GET /concertsusers/new
  # GET /concertsusers/new.json
  def new
    @concertsuser = ConcertsUser.new

    respond_to do |format|
      format.json { render :json => @concertsuser }
    end
  end

  # GET /concertsusers/1/edit
  def edit
    @concertsuser = ConcertsUser.find(params[:id])
  end

  # POST /concertsusers
  # POST /concertsusers.json
  def create
    @concertsuser = ConcertsUser.new(params[:concertsuser])

    respond_to do |format|
      if @concertsuser.save
        format.json { render :json => @concertsuser, :status => :created}
      else
        format.json { render :json => @concertsuser.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /concertsusers/1
  # PUT /concertsusers/1.json
  def update
    @concertsuser = ConcertsUser.find(params[:id])

    respond_to do |format|
      if @concertsuser.update_attributes(params[:concertsuser])
        format.json { head :no_content }
      else
        format.json { render :json => @concertsuser.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /concertsusers/1
  # DELETE /concertsusers/1.json
  def destroy
    @concertsuser = ConcertsUser.find(params[:id])
    @concertsuser.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
