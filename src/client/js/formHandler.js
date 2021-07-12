function handleSubmit(event) {
    event.preventDefault()

    var destInput = document.querySelectorAll('input[name=test-dest]')

        console.log(" BUILDING... ");
        fetch('http://localhost:3000/destination', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: destInput[0].value})
        })
        .then(res => res.json())
        .then(function(res) { 
        	document.querySelector('section.dest-results #lengthOfTrip').innerHTML = res.lengthOfTrip
            document.querySelector('section.dest-results #lat').innerHTML = res.lat
            document.querySelector('section.dest-results #lng').innerHTML = res.lng
            document.querySelector('section.dest-results #countryCode').innerHTML = res.countryCode
            document.querySelector('section.dest-results #placeName').innerHTML = res.placeName
            document.querySelector('section.dest-results #temp').innerHTML = res.temp
            document.querySelector('section.dest-results #image').innerHTML = res.image          
        })

}

export { handleSubmit }
