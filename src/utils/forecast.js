const request = require('request');



const forecast = (lat,lon,callback) => {

	const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=653c772f9b71ea16e4c5e83dd3141b85&units=metric';

	request({url, json:true}, (error,{body} ={}) => {
		if(error) {
			callback('Please check your internet connect. Unable to reach',undefined)
		}
		else if(body.message) {
			callback('Unable to find location',undefined)
		}
		else {
			callback(undefined,{Weather :body.weather[0]['main'],
						Temperature:body.main['temp'] + ' degree celsius',
						Description:body.weather[0]['description'],
						CityName: body.name,
						Country: body.sys['country'],
					})
		}
	});

};


module.exports =forecast;
