// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

//const note = L.icon({
//    iconUrl: ' https://drive.google.com/uc?export=view&id=1-tbEc3oddtmF9lTj3mzH8M3qvu5_vnVI',
//    iconSize: [38, 50],
//});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(lat,lng,title,message, spotify){
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>${spotify}`)
    return message
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    results.data.forEach(data => {
        addMarker(data.lat,data.lng,data["What was your favorite artist you've seen live?"],data['What venue did you see them at?'], data['Please put the Spotify embed URL of your favorite song of theirs!'])
    })
}


const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdMctvXFTrl6HGpquoceojNqNc96DiZq7TikjpUnlzpljTUM7UEGnSLdZdPBtE3TmKYtzjYDTYKBzz/pub?output=csv"
loadData(dataURL)

