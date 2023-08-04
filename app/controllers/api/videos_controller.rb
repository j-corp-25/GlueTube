class Api::VideosController < ApplicationController
  wrap_parameters include: Video.attribute_names + [:video]
  before_action :require_login, only: [:create, :update, :destroy]

  def index
    @videos = Video.all.sort { |b, a| b.created_at <=> a.created_at }
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end

  def create
    @video = current_user.videos.new(video_params)
    if @video.save
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @video = current_user.videos.find(params[:id])

    if @video.update(video_params)
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @video = current_user.videos.find(params[:id])
    @video.destroy
    render :show
  end

  def search
    query = params[:query]
    @videos = Video.where("title ILIKE ? OR description ILIKE ?", "%#{query}%", "%#{query}%")
    render :search
  end

  private

  def video_params
    params.require(:video).permit(:id,:title, :description, :video)
  end
end
