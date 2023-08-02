Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resources :videos do
      resources :comments
    end
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy, :update]
    resources :dislikes, only: [:create, :destroy]
    resource :session, only: [:create, :show, :destroy, :index]
  end
  get "*path", to: "static_pages#frontend_index"

  # post 'api/test', to: 'application#test'
end
