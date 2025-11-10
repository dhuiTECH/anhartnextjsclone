/**
 * Centralized Address Configuration
 * 
 * This file contains all address-related information for the organization.
 * Update the address here and it will be reflected across the entire application.
 */

/**
 * Main office address information
 */
export const OFFICE_ADDRESS = {
  // Full formatted address for display
  full: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8",
  
  // Address components for different use cases
  suite: "Suite 1480",
  building: "RBC Building",
  street: "885 West Georgia Street",
  city: "Vancouver",
  province: "BC",
  country: "Canada",
  postalCode: "V6C 3E8",
  
  // Coordinates for mapping (if needed)
  coordinates: {
    lat: 49.2827,
    lng: -123.1207
  },
  
  // Formatted versions for different contexts
  short: "885 West Georgia Street, Vancouver, BC",
  oneLine: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC V6C 3E8",
  
  // Google Maps specific formats
  googleMaps: {
    search: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8",
    directions: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8"
  }
} as const;

/**
 * Contact information that references the address
 */
export const CONTACT_INFO = {
  address: OFFICE_ADDRESS,
  phone: "604.529.6259",
  email: "info@anhart.ca",
  officeHours: {
    weekdays: "Monday - Friday: 9:00 AM - 5:00 PM",
  }
} as const;

/**
 * Utility functions for address formatting
 */
export const AddressUtils = {
  /**
   * Get the full address for display
   */
  getFullAddress: () => OFFICE_ADDRESS.full,
  
  /**
   * Get the short address for compact display
   */
  getShortAddress: () => OFFICE_ADDRESS.short,
  
  /**
   * Get the one-line address for forms
   */
  getOneLineAddress: () => OFFICE_ADDRESS.oneLine,
  
  /**
   * Get the address formatted for Google Maps search
   */
  getGoogleMapsAddress: () => OFFICE_ADDRESS.googleMaps.search,
  
  /**
   * Get the address formatted for Google Maps directions
   */
  getGoogleMapsDirectionsAddress: () => OFFICE_ADDRESS.googleMaps.directions,
  
  /**
   * Get address components as an array for display
   */
  getAddressLines: () => [
    OFFICE_ADDRESS.suite,
    OFFICE_ADDRESS.building,
    OFFICE_ADDRESS.street,
    `${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.province} ${OFFICE_ADDRESS.postalCode}`,
    OFFICE_ADDRESS.country
  ],
  
  /**
   * Get coordinates for mapping
   */
  getCoordinates: () => OFFICE_ADDRESS.coordinates
} as const;
