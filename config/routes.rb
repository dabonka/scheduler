Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :calendars
  root :to => "calendars#index"
  post '/' => "calendars#index"

  resources :calendars do
    resources :events, only: [:index, :create, :destroy, :update]
  end
end
