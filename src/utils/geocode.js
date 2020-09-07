const request = require('request');

const geocode = (address, callbacks) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hzdTYwNjAxNSIsImEiOiJja2VqZGg1cnkwdDNzMnlvaHc2Y294eHltIn0.K3NFEChyKr-5S7K00S4qOA&limit=1';
    
    request({ url, json: true}, (err, { body }) => {
        if (err) { // low level (not related to the server)
            callbacks('Unable to connect to the location service!', undefined);
        } else if (body.features.length === 0) { // the server receive the request but can't return
            callbacks('Unable to find the location! Try another search.', undefined);
        } else {
            callbacks(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }   
    });
}

module.exports = geocode;