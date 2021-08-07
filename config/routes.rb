Rails.application.routes.draw do
  root 'perfect_shifts#index'
  get '/help',      to: 'static_pages#help'
  get  '/signup',   to: 'masters#new'
  get '/login',     to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  get '/comfirmed_shifts',  to: 'comfirmed_shifts#index'
  post '/logout',    to:'sessions#destroy'

  resources :masters do
    get       :shift_onoff_form, on: :collection
    patch     :shift_onoff   , on: :collection
    resources :shift_separations, :except => [:show]


    member do
      get :login,  to: 'masters#login_form'
      post :login, to: 'masters#login'
      delete :logout
    end
  end

  resources :staffs do
    get :no_submits, on: :collection
    get :already_submits, on: :collection
  end

  resources :patterns, :only => [:index, :destroy]

  resources :perfect_shifts, :only => [:index] do
    collection do
      get :fill
      get :change
      get :new_plan
      post :create_plan
      get :new_shift
      post :create_shift
      get :change_shift
    end

    member do
      patch :fill_in
      patch :instead
      patch :delete

      patch :change_empty
      patch :change_master

      patch :admit
      patch :reject
      
      patch :direct_change
      patch :own_instead
    end
  end

  resources :temporary_shifts , :only => [:index, :destroy] do
    collection do
      get :new_shift
      get :new_plan
      post :create_shift
      post :create_plan
      get  :delete
      patch :perfect
      get :verification
    end
    
    member do
      patch :deletable
      patch :time_cut
    end
  end

  resources :deletable_shifts, :only => [:index] do
    get :restore , on: :collection
    patch :reborn, on: :member
  end
  
  resources :individual_shifts do
    
    collection do
      get :bulk_new
      post :bulk_create
      patch  :perfect
      get  :remove
      post :finish
      post :abandon

      get :bulk_delete_form
      post :bulk_delete

      get  :not_submit_period
    end

    member do
      patch :deletable, to: 'individual_shifts#deletable'
    end
  end

  resources :notices, :only => [:index] do
    member do
      patch :admit
      patch :reject
    end
  end
end
