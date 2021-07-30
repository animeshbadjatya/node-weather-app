const request = require('postman-request')

const getWeather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=24dbc8b8d1b5aca0413b882cabd1cc6a&query=' + latitude + ',' + longitude


    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to network");
        } else if (response.body.error) {
            console.log(latitude + " " + longitude)
            callback("Unable to find weather of the specified location")
        } else {
            callback(undefined, response.body.current);
        }
    })
}

module.exports = {
    getWeather: getWeather
}