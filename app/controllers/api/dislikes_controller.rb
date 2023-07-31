class Api::DislikesController < ApplicationController
  before_action :current_video, :require_login, only: [:create, :destroy]

  def create
    @dislike = @video.dislikes.new(author: current_user)

    if @disklike.save
      render json: { message: 'Video liked successfully.' }, status: :created
    else
      render json: @dislike.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @dislike = @video.dislikes.find_by(author: current_user)

    if @dislike
      @dislike.destroy
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
