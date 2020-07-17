console.log("Javascript form client side");





const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weather = document.querySelector('#msg-1');
const temperature = document.querySelector('#msg-2');
const description = document.querySelector('#msg-3');
const cityName = document.querySelector('#msg-4');
const country = document.querySelector('#msg-5');




weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	weather.textContent = 'Loading...';
	temperature.textContent = '';
	description.textContent = '';
	cityName.textContent = '';
	country.textContent = '';
	
	fetch('http://127.0.0.1:3000/weather?address='+location).then((response) => {
		response.json().then((data) => {
			if(data.error) {
				weather.textContent = data.error;
			}
			else {
				weather.textContent = "Weather : " + data.Weather;
				temperature.textContent = "Temperature : " + data.Temperature;
				description.textContent = "Description : " + data.Description;
				cityName.textContent = "City Name : " + data.CityName;
				country.textContent = "Country : " + data.Country;
			}
			});

		});

});