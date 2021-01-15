// index.js

const {
  fetchMyIP,
  defineCoordinatesByIP,
  fetchISSFlyoverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

const IP = process.argv[2].toString();

// // Callback for nextISSTimesForMyLocation
// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// });

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
// defineCoordinatesByIP(IP, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!");
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

// module.exports = {
//   IP,
// };
