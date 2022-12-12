'use strict';

const mapMessage = document.querySelector('.map-message');
const map = document.querySelector('.map');
const options = {
    enableHighAccuracy: true
};

updateMap();
/*******************
 *  Functions
*******************/

function getLocation(position) {
    const { latitude, longitude } = position.coords;
    displayLocation(longitude, latitude, `We deliver right to your address!`);
}

function errorHandler(error) {
    console.log(error.message);
    displayLocation(0, 0, `Couldn't find your address`);
}

function updateMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        displayLocation(0, 0, `Geolocation is not supported by your browser`);
    }
}

function displayLocation(long, lat, message) {
    let newScript = document.createElement('script');
    newScript.innerHTML = `
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbG4iLCJhIjoiY2xibDIxN3hnMDM4bTNvbXdodndkNDhucSJ9.ci6EmdJjXcg1QPWA3DCOIA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [${long}, ${lat}], // starting position [lng, lat]
            zoom: 16, // starting zoom
        });
        const marker = new mapboxgl.Marker()
            .setLngLat([${long}, ${lat}])
            .addTo(map);`;
    map.appendChild(newScript);
    mapMessage.innerHTML = message;
}