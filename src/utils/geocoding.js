const request = require("request");

const geocoding = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoiYWFraHRhcjc2OTAwIiwiYSI6ImNqanJ6ZGlyaDA2MXAza28wMmt6c2h3YWYifQ.4SC5lupoNUvNaUEuyUJQRQ`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Ubable to connect to API", undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (response.body.features.length === 0) {
            callback("Location not found", undefined);
        } else {
            const data = response.body;
            const lat = data.features[0].center[1];
            const lon = data.features[0].center[0];
            const place_name = data.features[0].place_name;

            callback(undefined, {
                lat: lat,
                lon: lon,
                place_name : place_name
            });
        }
    });
};

module.exports = geocoding