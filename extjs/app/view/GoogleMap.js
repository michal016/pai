/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.GoogleMap', {
    extend: 'Ext.panel.Panel',
    xtype: 'googleMap',

    marker: '',

    html: '<div id="map-canvas" style="width: 100%; height: 100%;"></div>',

    afterRender: function () {

        this.callParent(arguments);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loadMap);
        } else {
            console.log("Geolokalizacja nie jest obsługiwana.");
        }

    },

    loadMap: function (position) {

        var map,
            form,
            mapOptions = {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 8
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(map, 'click', function (event) {

            if (this.marker != null) {
                this.marker.setMap(null);
            }

            this.marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });

            form = Ext.ComponentQuery.query('form#addDefectForm')[0];
            form.down('textfield[name=longitude]').setValue(event.latLng.lng());
            form.down('textfield[name=latitude]').setValue(event.latLng.lat());

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({'latLng': event.latLng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {

                        console.log(results);

                    } else {
                        alert('No results found');
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });

        });
    },

    geocode: function (latLng) {
        geocoder.geocode({'latLng': latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {

                    console.log(results);

                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }

});
