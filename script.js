const map = L.map('map').setView([20, 10], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const norwegianFlag = L.divIcon({
    html: `
        <div class="norway-pin">
            <div class="flag">
                <div class="blue-horizontal"></div>
                <div class="blue-vertical"></div>
            </div>
        </div>
    `,
    className: '',
    iconSize: [24, 34],
    iconAnchor: [12, 34]
});

fetch('territories_polygons.geojson')

    .then(response => response.json())      
    .then(data => {

L.geoJSON(data, {
    style: {
        fillColor: '#ffe37a',
        fillOpacity: 0.7,
        color: '#ffffff',
        weight: 1
    },

    
    onEachFeature: function(feature, layer) {
    
    const point = feature.properties.label_point;

    L.marker([point[1], point[0]], {
        icon: norwegianFlag
    }).addTo(map);
    

        layer.bindPopup(
        '<div class="popup-content">' +
        '<h3>' + feature.properties.name_en + '</h3>' +
        '<p><strong>Period:</strong> ' + feature.properties.period_text + '</p>' +
        '<p>' + feature.properties.new_country + '</p>' +
        '</div>'
        
    );
}
}).addTo(map);

});