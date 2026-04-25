mapboxgl.accessToken = mapToken; 
const map = new mapboxgl.Map({ container: 'map', center: coordinates, zoom: 9 }); 
// Create popup 
 const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML("<h4>Fun Place for Winters</h4><p>Exact location provided after booking</p>");
   // Create marker and attach popup
     new mapboxgl.Marker({ color: "red" })
      .setLngLat(coordinates) 
      .setPopup(popup) 
       .addTo(map);