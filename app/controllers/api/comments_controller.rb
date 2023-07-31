class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where(parent_id: nil).sort_by(&:created_at).reverse
    render :index
  end

  def create
    @video = Video.find(params[:video_id])
    @comment = @video.comments.build(comment_params)
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
    @comment = current_user.comments.find(params[:id])
    # @comment = Comment.find(params[:id])
    #testing with postman/


    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    # @comment = Comment.find(params[:id])
    # /testing with postman/
    @comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :parent_id)
  end
end
