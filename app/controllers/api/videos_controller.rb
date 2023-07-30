class Api::VideosController < ApplicationController
  wrap_parameters include: Video.attribute_names + [:video]
  before_action :require_login, only: [:create, :update, :destroy]

  # def index
  #   @videos = Video.includes(:author).all
  #   render :index
  # end

  def index
    @videos = Video.all.sort { |b, a| b.created_at <=> a.created_at }
    render :index
  end

  # def show
  #   @video = Video.includes(:author).find(params[:id])
  #   render :show
  # end
  def show
    @video = Video.find(params[:id])
    render :show
  end

  def create
    @video = current_user.videos.new(video_params)

    if @video.save
      # render json: { "video has been created": @video }, status: :created
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

  private

  def video_params
    params.require(:video).permit(:id,:title, :description, :video)
  end
end
