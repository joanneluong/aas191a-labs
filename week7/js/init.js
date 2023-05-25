// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':9}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

Stamen_TonerLite.addTo(map)



let concert = L.featureGroup();
let noConcert = L.featureGroup();

let layers = {
    "Respondent who has attended a live concert": concert,
    "Respondent who has never attended a live concert": noConcert
}

// add layer control box
L.control.layers(null,layers).addTo(map)

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// create a function to add markers
function addMarker(data){
    if(data["Have you ever attended a live concert?"] == "Yes"){
        circleOptions.fillColor = "blue"
        concert.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["What was your favorite artist you've seen live?"]}</h2> 
        <h3>${data['What venue did you see them at?']}</h3>${data['Please put the Spotify embed URL of your favorite song of theirs!']}`))
        createButtons(data.lat,data.lng,data["What was your favorite artist you've seen live?"], data['What venue did you see them at?'])
    }
    else{
        circleOptions.fillColor = "red"
        noConcert.addLayer(L.circleMarker([0,0],circleOptions).bindPopup('<h2> Have never been to a live conert </h2>'))
        createButtons(0,0, "Have never been to a live concert", "")
    }
    // return data['What venue did you see them at?']
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
    concert.addTo(map)
    noConcert.addTo(map)
    let allLayers = L.featureGroup([concert,noConcert]);
    map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)

