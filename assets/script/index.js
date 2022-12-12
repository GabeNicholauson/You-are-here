'use strict';

const mapMessage = document.querySelector('.map-message');
const map = document.querySelector('.map');
const options = {
    enableHighAccuracy: true
};

updateMap();

sessionStorage.clear();
localStorage.clear();
/*******************
 *  Functions
*******************/

function getLocation(position) {
    const { latitude, longitude } = position.coords;
    displayLocation(longitude, latitude);
}

function errorHandler(error) {
    console.log(error.message);
    let newScript = document.createElement('script');
    newScript.innerHTML = `
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbG4iLCJhIjoiY2xibDIxN3hnMDM4bTNvbXdodndkNDhucSJ9.ci6EmdJjXcg1QPWA3DCOIA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [30, 30], // starting position [lng, lat]
            zoom: 5, // starting zoom
        })`;
    map.appendChild(newScript);
    mapMessage.innerHTML = `Couldn't find address`;
}

function updateMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        mapMessage.innerHTML = `Geolocation is not supported by your browser`;
    }
}

function displayLocation(long, lat) {
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
    mapMessage.innerHTML = `We deliver right to your address!`;
}