async function initAutocomplete(inputId) {
  const { Place } = await google.maps.importLibrary("places");

  const input = document.getElementById(inputId);

  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['address'],
    componentRestrictions: {}, // Adjust as needed
    fields: ['address_components', 'formatted_address', 'geometry']
  });

  autocomplete.addListener('place_changed', () => fillInAddress(autocomplete, inputId));
}

function fillInAddress(autocomplete, inputId) {
  const place = autocomplete.getPlace();

  if (!place.address_components) {
    console.log("No address components found");
    return;
  }

  let city = '';
  let state = '';
  let stateCode = '';
  let country = '';
  let countryCode = '';
  let address = '';
  let zipcode = '';
  let streetNumber = '';
  let route = '';

  place.address_components.forEach(component => {
    const types = component.types;

    if (types.includes('street_number')) {
      streetNumber = component.long_name;
    }

    if (types.includes('route')) {
      route = component.long_name;
    }

    if (types.includes('locality') || types.includes('postal_town')) {
      city = component.long_name;
    }

    if (types.includes('administrative_area_level_1')) {
      state = component.long_name;
      stateCode = component.short_name;
    }

    if (types.includes('country')) {
      country = component.long_name;
      countryCode = component.short_name;
    }

    if (types.includes('postal_code')) {
      zipcode = component.long_name;
    }
  });

  // Construct full address
  address = `${streetNumber} ${route}`.trim();

  // Get form elements
  const addressInput = document.getElementById(inputId);
  const prefix = inputId === 'b_autocomplete' ? 'order_bill_address_attributes_' : 'order_ship_address_attributes_';
  const adminprefix = inputId === 'b_autocomplete' ? 'user_bill_address_attributes_' : 'user_ship_address_attributes_';

  // Find and populate fields
  const cityInput = findElement([
    adminprefix + 'city',
    'address_city',
    prefix + 'city'
  ]);

  const zipcodeInput = findElement([
    adminprefix + 'zipcode',
    'address_zipcode',
    prefix + 'zipcode'
  ]);

  const countryDropdown = findElement([
    adminprefix + 'country_id',
    'address_country_id',
    prefix + 'country_id'
  ]);

  const stateDropdown = findElement([
    adminprefix + 'state_id',
    'address_state_id',
    prefix + 'state_id'
  ]);

  if (addressInput) addressInput.value = address;
  if (cityInput) cityInput.value = city;
  if (zipcodeInput) zipcodeInput.value = zipcode;

  if (countryDropdown) {
    selectOptionByText(countryDropdown, country) ||
    selectOptionByValue(countryDropdown, countryCode);
  }

  if (stateDropdown) {
    selectOptionByText(stateDropdown, state) ||
    selectOptionByText(stateDropdown, stateCode) ||
    selectOptionByValue(stateDropdown, stateCode);
  }
}

function findElement(ids) {
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) return element;
  }
  return null;
}

function selectOptionByText(selectElement, text) {
  if (!selectElement || !text) return false;

  const option = Array.from(selectElement.options).find(
    option => option.text.toLowerCase() === text.toLowerCase()
  );

  if (option) {
    selectElement.selectedIndex = option.index;
    selectElement.dispatchEvent(new Event('change'));
    return true;
  }
  return false;
}

function selectOptionByValue(selectElement, value) {
  if (!selectElement || !value) return false;

  const option = Array.from(selectElement.options).find(
    option => option.value.toLowerCase() === value.toLowerCase()
  );

  if (option) {
    selectElement.selectedIndex = option.index;
    selectElement.dispatchEvent(new Event('change'));
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  const autocompleteFields = document.querySelectorAll('[id$="_autocomplete"]');
  autocompleteFields.forEach(field => {
    field.addEventListener('click', () => initAutocomplete(field.id));
  });
});
