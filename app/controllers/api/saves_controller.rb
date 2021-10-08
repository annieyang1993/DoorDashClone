class Api::SavesController < ApplicationController
  def create
    @save = Save.new(save_params)
    @oldsave = Save.find_by(user_id: params[:saves][:user_id], restaurant_id: params[:saves][:restaurant_id]);
    
    if @oldsave
       render json: @save.errors.full_messages, status: 422
    elsif @save.save
      render "api/saves/show"
    else
      render json: @save.errors.full_messages, status: 422
    end
  end

  def show
    @save = Save.find_by(user_id: params[:saves][:user_id], restaurant_id: params[:saves][:restaurant_id]);
    if @save
      render "api/saves/show"
    else 
      render json: @save.errors.full_messages, status: 422
    end
  end


  def index
    @saves = User.find(params[:user_id]).saves
    render :index
  end

  def destroy
    @save = Save.find_by(user_id: params[:saves][:user_id], restaurant_id: params[:saves][:restaurant_id]);
    @save.destroy!
    render :index
  end

  private

  def save_params
    params.require(:saves).permit(:restaurant_id, :user_id)
  end
end
