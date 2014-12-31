/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.GoogleMapInfo', {
    extend: 'Ext.panel.Panel',
    xtype: 'googleMapInfo',

    marker: '',

    html: '<div id="map-info-canvas" style="width: 100%; height: 100%;"></div>',

    loadMap: function (position) {

        var map,
            marker,
            mapOptions = {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 16
            };
        map = new google.maps.Map(document.getElementById('map-info-canvas'), mapOptions);

        marker = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: map
        });
    }
});