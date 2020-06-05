
const axios = require('axios');

var data = null;

// Make a request for a user with a given ID
axios.get('https://schedge.a1liu.com/2020/FA/UA/CORE')
  .then(function (response) {
    // handle success
    data = response.data
    console.log(data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

