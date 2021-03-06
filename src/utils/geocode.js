const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pbWVzaDEwMDgiLCJhIjoiY2tybzN4NHJmMHpqejJvbW80ZHg2cTBoZyJ9.9WBlahd_YXUTh9V0td4jiA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to network')
        } else if (body.features.length == 0) {
            callback("Unable to find location");
        } else {
            //     console.log ("*****"+response.body.features[0].center[1])
            callback(undefined, { latitude: body.features[0].center[1], longitude: body.features[0].center[0],location: body.features[0].place_name })

        }
    })

}

module.exports = geocode;