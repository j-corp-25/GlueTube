class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.all.sort_by(&:created_at).reverse
    render :index
  end

  def create
    @video = Video.find(params[:video_id])
    @comment = @video.comments.build(comment_params)
    @comment.author = current_user
    if @comment.save
      render :show
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @comment = current_user.comments.find(params[:id])

    if @video.update(comment_params)
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :parent_id)
  end

end
