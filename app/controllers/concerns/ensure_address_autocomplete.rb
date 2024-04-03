module EnsureAddressAutocomplete
  extend ActiveSupport::Concern

  # filter for checking if this feature is enabled or not before running any controller action
  included do
    before_action :ensure_address_autocomplete_enabled
  end

  def ensure_address_autocomplete_enabled
    raise CanCan::AccessDenied unless Flipper.enabled?(:address_autocomplete, current_store.try(:id))
  end
end
