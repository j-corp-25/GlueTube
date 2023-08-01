class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.where(parent_id: nil).sort_by(&:created_at).reverse
    render :index
  end

  def create
    @video = Video.find(params[:video_id])
    @comment = @video.comments.create(comment_params)
    @comment.author = current_user
    if @comment.save
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # def create
  #   @video = Video.find(params[:video_id])
  #   @comment = @video.comments.build(comment_params)
  #   @comment.author = User.first
  #   #/testing with postman/
  #   if @comment.save
  #     render json: @comment
  #   else
  #     render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment.author_id == current_user.id
      if @comment.update(comment_params)
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to edit this comment'], status: 403
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment.author_id == current_user.id
      @comment.destroy
      render :show
    else
      render json: ['You do not have permission to delete this comment'], status: 403
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
