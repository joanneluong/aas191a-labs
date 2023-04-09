
// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); // (1)!

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // (2)!

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map) // (3)!
		.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I used to work!')
		.openPopup();
