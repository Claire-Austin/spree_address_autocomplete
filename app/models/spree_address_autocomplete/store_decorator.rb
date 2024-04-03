module SpreeAddressAutocomplete
  module StoreDecorator
    def self.prepended(base)
      base.has_one :address_autocomplete
    end
  end
end

::Spree::Store.prepend SpreeAddressAutocomplete::StoreDecorator
