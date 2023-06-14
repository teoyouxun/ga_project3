const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  // Add your Firebase Admin SDK configuration here
  // You can obtain the configuration from your Firebase project settings
});

// Get a reference to the Storage bucket
const bucket = admin.storage().bucket();

// Set the CORS configuration for the Storage bucket
bucket.setCorsConfiguration([
  {
    origin: ['http://localhost:5173'],
    method: ['GET', 'PUT', 'POST'],
    maxAgeSeconds: 3600,
  },
])
  .then(() => {
    console.log('CORS configuration updated successfully.');
  })
  .catch((error) => {
    console.error('Error updating CORS configuration:', error);
  });
