Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get 'videos/search', to: 'videos#search'
    resources :users, only: [:create, :index]
    resources :videos do
      resources :comments
    end
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy, :update]
    resources :dislikes, only: [:create, :destroy]
    resource :session, only: [:create, :show, :destroy, :index]
  end

  # post 'api/test', to: 'application#test'
  get "*path", to: "static_pages#frontend_index"
end
