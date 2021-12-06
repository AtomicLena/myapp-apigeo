var earth;

async function geoApi()
{
    const response = await fetch('api-ip.php', {
        method: 'GET'
    });
    return response.text();
}

function geolocation()
{
    geoApi()
    .then( data => {
        console.log(data);
        let geoInfo = '<h1>Geolocalización</h1>'+data;
        document.getElementById('respuesta').innerHTML = geoInfo;

        //se rompe a no ser que devuelvas un JSON
        earth.panTo([data.results.latitude,data.results.longitude]);
    })
    .catch( () => {
        console.log("error");
    })
}

initialize()
.then( () => {
    geolocation();
})
.catch( () => {
    console.log("error 2");
});

async function initialize()
{
    earth = WE.map('earth_div', {
        center: [0, 0],
        zoom: 3,
        dragging: false,
        scrollWheelZoom: true
      });
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors'
    }).addTo(earth);

    return Promise.resolve();
}