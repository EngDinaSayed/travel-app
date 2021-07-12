var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const bodyParser = require('body-parser');
const cors = require('cors')
const fetch = require('node-fetch')

const dotenv = require('dotenv');
dotenv.config();

//Global Travel Data
const travelData = {};

//Geonames
const baseURL = 'http://api.geonames.org/searchJSON?q=';
const apiUser = process.env.GEONAMES_USERNAME;

//Weatherbit
const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherKey = process.env.WEATHERBIT_KEY;

//Pixabay
const pixaURL = 'https://pixabay.com/api/?key=';
const pixaKey = process.env.PIXABAY_KEY;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/destination', async function(req, res){

	//Fetching Geonames data based on the user destination iput
	const userDestination = req.body.destination;
	const apiURL = `${baseURL}${userDestination}&maxRows=10&username=${apiUser}`;
	const response = await fetch(apiURL);
	const APIdata = await response.json();
	console.log(APIdata);
    
    //Calculating length of trip
	const startDate = new Date(req.body.startDate);
	const endDate = new Date(req.body.endDate);
	const duration = (endDate - startDate) + " Days";
	const lengthOfTrip = req.body.lengthOfTrip;
	lengthOfTrip = duration;
	travelData.lengthOfTrip = lengthOfTrip;

	//Parse Geonames Data and adding them one by one to Travel Data
	const lat= req.body.geonames[0].lat;
	travelData.lat = lat;
	const lng = req.body.geonames[0].lng;
	travelData.lng = lng;
	const countryCode = req.body.geonames[0].countryCode;
	travelData.countryCode = countryCode;
	const placeName = req.body.geonames[0].placeName;
	travelData.placeName = placeName;

	//Fetching Weatherbit Data based on the start date of the trip
	const currentDate = new Date().getTime();
    const DiffDays = (startDate - currentDate) / (1000 * 3600 * 24);
    const weatherbitURL = '';

    /*
    I've implemented the below condition after searching as I got confused between the different API versions and URLs provided here:
    https://www.weatherbit.io/api/weather-forecast-16-day
    https://www.weatherbit.io/api/weather-current
    Question is: What if the user entered a date within the current week?
    */

    if(DiffDays > 7){
    	weatherbitURL = `${weatherURL}${latitude}&lon=${longitude}&key=${weatherKey}`;
    }else{
    	weatherbitURL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherKey}`;
    }

	const weatherResponse = await fetch(weatherbitURL);
	const weatherData = await weatherResponse.json();
	console.log(weatherData);
	
	const temp = req.body.temp;
	travelData.temp = temp;

	//Fetching Pixabay Data

	/*
	I've used placeName to fetch the image from pixabay as it requires a city name
	Question is: What if the user entered the destination as a zip code not a city name?
	*/

	const pixabayURL = `${pixaURL}${pixaKey}&q=${placeName}&image_type=photo`;
	const pixaResponse = await fetch(pixabayURL);
	const pixaBaydata = await pixaResponse.json();
	console.log(pixaBaydata);
	
	const imageHits = req.body.hits;
	const image = imageHits[0].webformatURL;
	travelData.image = image;

	//Update Travel App Data
	console.log(`${travelData}`);
	res.send(travelData);
})

/*
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
*/

//Export for server testing usages
module.exports = app
