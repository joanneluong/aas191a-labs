console.log("hello world!")

// JavaScript const variable declaration
const map = L.map('the_map').setView([39.0709, -118.444], 5); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 


function addMarker(lat,lng,title, message){ 
    console.log(message) 
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`) 
    return message 
}

//JavaScript let variable declaration to create a marker
addMarker(45.5231, -122.6812, 'Powells City of Books', 'one of my favorite bookstores in Portland! it always has such a wide selection of books and i can spend hours here')
addMarker(36.8224, -119.7011, 'A Book Barn', 'a used bookstore i used to visit a lot in my hometown!')
addMarker(33.8088, -117.8505, 'Bookman', 'a used bookstore in Orange that I got a Carl Sagan book at!')
addMarker(34.0477, -118.2498, 'The Last Bookstore','the famous bookstore in DTLA that i have gotten many books at!')
