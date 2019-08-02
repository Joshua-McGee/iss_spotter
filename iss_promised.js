// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  // create an object with the latitude and longitude values and give them access to the body data key.
  const { latitude, longitude } = JSON.parse(body).data; 
  // variable that holds our url, also passes in lat and long from our data we previously recieved from fetchCoordsByIP
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;

  return request(url);
};
// create a function that passes each of the previous functions data to each other then returns the response
// in the form of a JSON object
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

// module.exports = { 
//   fetchMyIP,
//   fetchCoordsByIP,
//   fetchISSFlyOverTimes 
// };