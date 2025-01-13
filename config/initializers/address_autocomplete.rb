Rails.application.config.after_initialize do
  if Spree::Core::Engine.backend_available?
    Rails.application.config.spree_backend.main_menu.add_to_section(
      'settings',
      ::Spree::Admin::MainMenu::ItemBuilder.new(
        'address_autocomplete_settings',
        ::Spree::Core::Engine.routes.url_helpers.edit_admin_address_autocomplete_path
      )
      .with_manage_ability_check(::Spree::AddressAutocomplete)
      .with_match_path('/address_autocomplete_settings')
      .build
    )
  end
end
