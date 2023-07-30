Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resources :videos do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:update, :destroy]
    resource :session, only: [:create, :show, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"

  # post 'api/test', to: 'application#test'
end
