// iss.js

const request = require("request");

// Fetch our IP Address
const fetchMyIP = function (callback) {
  const query = "https://api.ipify.org?format=json";

  request(query, (error, description, body) => {
    if (error) return callback(error, null);

    // If it's a non-200 status assume server error
    if (description.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
    } else {
      const data = JSON.parse(body);
      callback(null, data.ip);
    }
  });
};

// Fetch the geo coordinates (Latitude & Longitude) for our IP
const defineCoordinatesByIP = function (ip, callback) {
  const query = "https://freegeoip.app/json/" + ip;

  request(query, (error, description, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // If it's a non-200 status assume server error
    if (description.statusCode !== 200) {
      const msg = `Status Code ${description.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      callback(null, {
        latitude: data.latitude,
        longitute: data.longitude,
      });
    }
  });
};

// Fetch the next ISS flyovers for our geo coordinates
const fetchISSFlyoverTimes = function (coordinates, callback) {
  const LAT = coordinates.latitude;
  const LON = coordinates.longitude;

  const query = `http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`;

  request(query, (error, description, body) => {
    if (error) return error, null;

    if (description.statusCode !== 200) {
      const msg = `Status Code ${description.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      callback(null, data[0]);
    }
  });
};

module.exports = {
  fetchMyIP,
  defineCoordinatesByIP,
};
