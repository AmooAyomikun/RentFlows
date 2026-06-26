/**
 * Maps property IDs to real Unsplash photo URLs.
 * Using specific photo IDs so they're consistent (not random).
 */
export const PROPERTY_PHOTOS = {
  'prop-1': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  'prop-2': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'prop-3': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'prop-4': 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
  'prop-5': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'prop-6': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  'prop-7': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'prop-8': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
};

/**
 * Returns the photo URL for a given property ID,
 * with a fallback gradient if no mapping exists.
 */
export const getPropertyPhoto = (propertyId) => PROPERTY_PHOTOS[propertyId] || null;
