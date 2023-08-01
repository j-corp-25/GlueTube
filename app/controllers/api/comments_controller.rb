class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.all.find(params[:video_id])
    render 'api/videos/show'
  end

  def create

    @video = Video.find(params[:video_id])
    return render json: { errors: ['Video not found'] }, status: :not_found unless @video

    @comment = @video.comments.new(comment_params)
    @comment.author = current_user
    if @comment.save
      render json: @comment, status: :created
      render 'api/videos/show'
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def update
    @comment = Comment.find_by(id: params[:id])
    return render json: { errors: ['Comment not found'] }, status: :not_found unless @comment

    if @comment.author_id == current_user.id
      if @comment.update(comment_params)
        render json: @comment.as_json # render updated comment as JSON
      else
        render json: @comment.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to edit this comment'], status: 403
    end
  end



  def destroy
    @comment = Comment.find_by(id: params[:id])
    return render json: { errors: ['Comment not found'] }, status: :not_found unless @comment

    if @comment.author_id == current_user.id
      @comment.destroy
      render json: { message: 'Comment successfully deleted' }  # modified line
    else
      render json: ['You do not have permission to delete this comment'], status: 403
    end
  end



  private

  def comment_params
    params.require(:comment).permit(:body, :author_id, :video_id)
  end
end
