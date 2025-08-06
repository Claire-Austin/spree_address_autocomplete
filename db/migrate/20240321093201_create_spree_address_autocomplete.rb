class CreateSpreeAddressAutocomplete < ActiveRecord::Migration[6.1]
  def change
    create_table :spree_address_autocompletes do |t|
      t.string :api_key

      t.timestamps
    end
  end
end
