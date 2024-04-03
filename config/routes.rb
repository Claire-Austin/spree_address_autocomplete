Spree::Core::Engine.add_routes do

  namespace :admin do
    resource :address_autocomplete, only: [:edit, :update]
  end
end
