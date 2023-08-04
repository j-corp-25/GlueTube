class Api::LikesController < ApplicationController
  before_action :current_video, :require_login, only: [:create, :destroy]

  def create
    @like = @video.likes.new(author: current_user)

    if @like.save
      render json: { message: 'Video liked successfully.' }, status: :created
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = @video.likes.find_by(author: current_user)

    if @like
      @like.destroy
      render json: { message: 'Like removed.' }, status: :ok
    else
      render json: { error: 'Like not found.' }, status: :not_found
    end
  end

  private

  def current_video
    @video = Video.find(params[:video_id])
  end
end
