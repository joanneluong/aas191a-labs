// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':9}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(data){
    L.circleMarker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data["What was your favorite artist you've seen live?"]}</h2> 
    <h3>${data['What venue did you see them at?']}</h3>${data['Please put the Spotify embed URL of your favorite song of theirs!']}`)
    createButtons(data.lat,data.lng,data["What was your favorite artist you've seen live?"], data['What venue did you see them at?'])
    return data['What venue did you see them at?']
}

function createButtons(lat,lng,title, loc){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title +" - " + loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 13;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdMctvXFTrl6HGpquoceojNqNc96DiZq7TikjpUnlzpljTUM7UEGnSLdZdPBtE3TmKYtzjYDTYKBzz/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    results.data.forEach(data => {
        addMarker(data)
        //console.log(data)
    })
}


loadData(dataURL)

