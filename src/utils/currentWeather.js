const request = require("request");

const currentWeather = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d40cc3cf86f38e548e753a58f1834ae0&query=${lat},${lon}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to servic", undefined);
        } else if (response.body.error) {
            callback(esponse.body.error.info, undefined);
        } else {
            const data = response.body;

            callback(undefined, {
                description: data.current.weather_descriptions[0],
                temperature: data.current.temperature,
                precip: data.current.precip,
            });
        }
    });
};

module.exports = currentWeather;
