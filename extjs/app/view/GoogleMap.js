/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.GoogleMap', {
    extend: 'Ext.panel.Panel',
    xtype: 'googleMap',

    html: '<div id="map-canvas" style="width: 100%; height: 100%;"></div>',
    afterRender: function () {

        this.callParent(arguments);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolokalizacja nie jest obsługiwana.");
        }

    },

    showPosition: function (position) {

        var mapOptions = {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 8
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    }


});
