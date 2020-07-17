const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialPaths);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {

	res.render('index',{
		title:'Weather',
		name:'pradeep'
	});

});

app.get('/help',(req,res) => {
	res.render('help',{
		title: 'help',
		name:'pradeep'
	});
})

app.get('/about',(req,res) => {
	res.render('about',{
		title: 'about',
		name: 'pradeep'

	});
})

app.get('/weather',(req,res) => {
	const address = req.query.address;
	if(address) {
		geocode.geocode(address, (error,{latitude,longitude} = {}) => {
  		if(error) {
    		res.send({
    			error : error
    		});
  		}
  		else {
	    	forecast(latitude,longitude,(error,{Weather,Temperature,Description,CityName,Country} = {}) => {
			if(error){
				res.send({error:error});
			}
			else {
				res.send({
					Weather,
					Temperature,
					Description,
					CityName,
					Country
				});
			}

		});
	  };
	});
}
else {
	res.send({error:'Please provide address!'});
}

});

app.get('/help/*',(req,res) => {
	res.render('404page', {
		title: '404',
		name: 'pradeep',
		errorMsg: 'Help article not found',
	});
});

app.get('*', (req,res) => {
	res.render('404page', {
		title: '404',
		name: 'pradeep',
		errorMsg:'Page not found',
	});
});



app.listen(3000, () => {
	console.log('Server is up');
});