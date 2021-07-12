# Travel App

## Overview 

This is the capstone for Udacity Front-End Developer Nano-Degree. This app takes 3 inputs from the user which are destination, start date, and end date. Then using the included APIs it represent the search results which are the length of trip, latitude, longtidue, country code, place name, temperature, and an image for that place. The project have service workers set up in webpack for offline functionality and Jest installed for testing purposes.

## APIs

* [Geonames](http://api.geonames.org)
* [Weatherbit](https://api.weatherbit.io/)
* [Pixabay](https://pixabay.com/api/)

## File Structure

    - src/
        - client/
            - js/
                - formHandler.js
            - media/
            - styles/
			    - base.scss
				- footer.scss
				- form.scss
				- header.scss
				- resets.scss
            - views/
                - index.html
            - index.js        
        - server/ 
            - index.js
			- mockAPI.js
    - test/
	    - formHandler.test.js
		- index.test.js	
    - .babelrc
    - .gitignore
	- jest.config.js
    - package-lock.json
    - package.json
    - README.md
    - webpack.dev.js
    - webpack.prod.js

## Getting started

`cd` into the current project folder and run:
- `npm install`
Development for Front-End:
- `npm run client`
Development for Back-End:
- `npm run server`
Deployment for Development mode:
- `npm run build`
Deployment for Production mode:
- `npm run start`
Testing using Jest:
- `npm run test`
