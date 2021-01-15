// iss.js

const request = require("request");
const { IP } = require("./index.js");

// Fetch our IP Address
const fetchMyIP = function (callback) {
  const query = "https://api.ipify.org?format=json";

  request(query, (error, response, body) => {
    if (error) return callback(error, null);

    // If it's a non-200 status assume server error
    if (response.statusCode !== 200) {
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
    if (error) return callback(error, null);

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
    if (error) return callback(error, null);

    if (description.statusCode !== 200) {
      const msg = `Status Code ${description.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      callback(null, data.response);
    }
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error);
    }

    defineCoordinatesByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error);
      }

      fetchISSFlyoverTimes(coordinates, (error, flyovers) => {
        if (error) {
          return callback(error);
        }
        callback(null, flyovers);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  defineCoordinatesByIP,
  fetchISSFlyoverTimes,
  nextISSTimesForMyLocation,
};
