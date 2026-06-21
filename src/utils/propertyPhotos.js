/**
 * Maps property IDs to real Unsplash photo URLs.
 * Using specific photo IDs so they're consistent (not random).
 */
export const PROPERTY_PHOTOS = {
  'prop-1': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'prop-2': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'prop-3': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'prop-4': 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&q=80',
};

/**
 * Returns the photo URL for a given property ID,
 * with a fallback gradient if no mapping exists.
 */
export const getPropertyPhoto = (propertyId) => PROPERTY_PHOTOS[propertyId] || null;
