// index.js

const {
  fetchMyIP,
  defineCoordinatesByIP,
  fetchISSFlyoverTimes
} = require('./iss')

// // Callback for fetchMyIP function
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     // We return to exit out of the program
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// // Callback for defineCoordinatesByIP function
// defineCoordinatesByIP("72.141.204.10", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     // We return to exit out of the program
//     return;
//   }

//   console.log("It worked! Returned coordinates: ", coordinates);
// });

// // Callback for defineCoordinatesByIP function
// fetchISSFlyoverTimes(
//   { latitude: 43.8669, longitude: -79.4414 },
//   (error, flyovers) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       // We return to exit out of the program
//       return;
//     }

//     console.log("It worked! Returned times: ", flyovers);
//   }
// );
