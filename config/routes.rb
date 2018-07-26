Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :calendars
  root :to => "calendars#index"
  post '/' => "calendars#index"

  namespace :api do 
    namespace :v1 do 
     resources :events, only: [:index, :create, :destroy, :update]
    end 
  end 

end
