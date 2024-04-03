function initAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', () => fillInAddress(autocomplete, inputId));
}

function fillInAddress(autocomplete, inputId) {
  const place = autocomplete.getPlace();

  let city = '';
  let state = '';
  let country = '';
  let address = '';
  let zipcode = '';

  place.address_components.forEach(component => {
    switch (true) {
      case component.types.includes('locality'):
        city = component.long_name;
        break;
      case component.types.includes('administrative_area_level_1'):
        state = component.long_name;
        break;
      case component.types.includes('country'):
        country = component.long_name;
        break;
      case component.types.includes('postal_code'):
        zipcode = component.long_name;
        break;
      case ['route', 'neighborhood', 'street_number'].some(type => component.types.includes(type)):
        address += component.long_name + ' ';
        break;
      default:
        break;
    }
  });

  const addressInput = document.getElementById(inputId);
  const prefix = inputId === 'b_autocomplete' ? 'order_bill_address_attributes_' : 'order_ship_address_attributes_';
  const adminprefix = inputId === 'b_autocomplete' ? 'user_bill_address_attributes_' : 'user_ship_address_attributes_';

  const cityInput = document.getElementById(adminprefix + 'city') || document.getElementById('address_city') || document.getElementById(prefix + 'city');
  const zipcodeInput = document.getElementById(adminprefix + 'zipcode') || document.getElementById('address_zipcode') || document.getElementById(prefix + 'zipcode');
  const countryDropdown = document.getElementById(adminprefix + 'country_id') || document.getElementById('address_country_id') || document.getElementById(prefix + 'country_id');

  addressInput.value = address;
  cityInput.value = city;
  zipcodeInput.value = zipcode;

  selectOptionByText(countryDropdown, country);

  const stateDropdown = document.getElementById(adminprefix + 'state_id') || document.getElementById('address_state_id') || document.getElementById(prefix + 'state_id');

  selectOptionByText(stateDropdown, state);
}

function selectOptionByText(selectElement, text) {
  if (selectElement) {
    const option = Array.from(selectElement.options).find(option => option.text === text);
    selectElement.selectedIndex = option ? option.index : -1;
    selectElement.dispatchEvent(new Event('change'));
  }
}
