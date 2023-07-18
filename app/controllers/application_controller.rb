class ApplicationController < ActionController::Base
  before_action :snake_case_params

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  helper_method :current_user, :logged_in?

  def require_logged_in
    redirect_to new_session_url unless logged_in?
  end

  def require_logged_out
    redirect_to users_url if logged_in?
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
  end

  def logged_in?
    !!current_user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end
  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end
end
