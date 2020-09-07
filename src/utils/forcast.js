const request = require('request');

const forcast = (lat, long, callbacks) => {
    const url = 'http://api.weatherstack.com/current?access_key=aadf700935939195be57683cb6235f10&query=' + lat + ','+ long + '&units=f';

    request({ url, json: true}, (err, { body }) => {
        if (err) { // low level (not related to the server)
            callbacks('Unable to connect to the weather service!', undefined);
        } else if (body.error) { // the server receive the request but can't return
            callbacks('Unable to find the location!', undefined);
        } else {
            callbacks(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ', ' + body.current.temperature + ' degress outside. There is a ' + body.current.precip + '% chance of rain.')
        }
    });
}

module.exports = forcast;