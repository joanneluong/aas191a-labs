

// declare the variables
let mapOptions = {'center':[39.0709,-118.444], 'zoom':5}

// JavaScript const variable declaration
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        var zoom = 15;
        map.flyTo([lat,lng], zoom); 
    })
    document.getElementById("contents").appendChild(newButton); 
}

function addMarker(lat,lng,title, message){ 
    console.log(message) 
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`) 
    createButtons(lat,lng,title);
    return message 
}

fetch("map.geojson")
    .then(response => {
        return response.json();
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => { 
                return L.circleMarker(latlng, {color: feature.properties.color})
            }
        }).bindPopup(layer => {
            return layer.feature.properties.place;
        }).addTo(map);
    });

//JavaScript let variable declaration to create a marker
addMarker(45.5231, -122.6812, 'Powells City of Books', 'one of my favorite bookstores in Portland! it always has such a wide selection of books and i can spend hours here')
addMarker(36.8224, -119.7011, 'A Book Barn', 'a used bookstore i used to visit a lot in my hometown!')
addMarker(33.8088, -117.8505, 'Bookman', 'a used bookstore in Orange that I got a Carl Sagan book at!')
addMarker(34.0477, -118.2498, 'The Last Bookstore','the famous bookstore in DTLA that i have gotten many books at!')
