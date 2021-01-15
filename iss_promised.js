// iss_promised.js
"use strict";

const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyoverTimes = function (data) {
  const LAT = JSON.parse(data).latitude;
  const LON = JSON.parse(data).longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`;

  return request(url);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(
      `Next pass will be ${datetime} and will last ${duration} seconds.`
    );
  }
};

module.exports = {
  nextISSTimesForMyLocation,
  printPassTimes,
};
