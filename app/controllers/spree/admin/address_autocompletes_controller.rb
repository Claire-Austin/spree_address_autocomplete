module Spree
  module Admin
    class AddressAutocompletesController < BaseController

      before_action :find_address_autocomplete, only: [:edit, :update]

      def edit
        unless @address_autocomplete
          @address_autocomplete =  Spree::AddressAutocomplete.create!(store: current_store)
        end
      end

      def update
        @address_autocomplete.update(address_autocomplete_params)

        flash[:success] = Spree.t(:successfully_updated, scope: :address_autocomplete)
        redirect_to edit_admin_address_autocomplete_path
      end

      private

      def find_address_autocomplete
        @address_autocomplete = current_store.address_autocomplete
      end

      def address_autocomplete_params
        params.require(:address_autocomplete).permit!.merge(store: current_store)
      end
    end
  end
end
