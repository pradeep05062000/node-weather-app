const request = require('request');


const geocode = (address,callback) => {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhZGVlcDA1IiwiYSI6ImNrY24zOTRwbjA3ZGkydHF5YnQzZGNvdDgifQ.wGMC_vNjRv6Q3vBvaKU3dg';

	request({url, json:true},(error,response) => {

		if(error) {
			callback('Check internet connection',undefined);
		}
		else if(response.body.features.length === 0) {

			callback('Location not found. Please try another location',undefined);

		}
		else {
			callback(undefined,{
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
			})

		}

	});

} 




module.exports = {
	geocode:geocode,
}