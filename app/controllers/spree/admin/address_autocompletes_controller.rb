module Spree
  module Admin
    class AddressAutocompletesController < BaseController
      before_action :load_address_autocomplete, only: [:edit, :update]

      def edit
        @address_autocomplete ||= Spree::AddressAutocomplete.create!
      end

      def update
        if @address_autocomplete.update(address_autocomplete_params)
          flash[:success] = Spree.t(:successfully_updated, scope: :address_autocomplete)
          redirect_to edit_admin_address_autocomplete_path
        else
          flash.now[:error] = Spree.t(:update_failed, scope: :address_autocomplete)
          render :edit
        end
      end

      private

      def load_address_autocomplete
        @address_autocomplete = Spree::AddressAutocomplete.first
      end

      def address_autocomplete_params
        params.require(:address_autocomplete).permit!
      end
    end
  end
end
