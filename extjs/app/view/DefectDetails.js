/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.DefectDetails', {
    extend: 'Ext.Container',
    xtype: 'defectDetails',
    requires: [
        'pai.view.GoogleMapInfo'
    ],
    padding: '20 20 20 10',
    layout : 'column',

    initComponent: function () {
        var me = this,
            refreshFn = 'Ext.ComponentQuery.query("defectDetails")[0].updateLayout()';

        Ext.applyIf(me, {
            items: [
                {
                    columnWidth: 1,
                    xtype: 'displayfield',
                    itemId: 'defectTitle'
                },
                {
                    columnWidth: 0.45,
                    xtype: 'container',
                    style: 'float: left;',
                    padding: '0 0 0 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'defectDate'
                        },
                        {
                            xtype: 'displayfield',
                            itemId: 'defectStatus'
                        },
                        {
                            xtype: 'displayfield',
                            itemId: 'defectLocalization'
                        },
                        {
                            xtype: 'displayfield',
                            itemId: 'defectDescription',
                            shrinkWrap: true
                        }
                    ]
                },
                //{
                //    xtype: 'image',
                //    itemId: 'defectImage',
                //    style: {
                //        'max-width': '400px',
                //        'max-height': '300px'
                //    }
                //}
                {
                    columnWidth: 0.45,
                    style: 'float: right;',
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            itemId: 'defectImage'
                        }
                    ]
                },
                {
                    columnWidth: 1,
                    xtype: 'googleMapInfo',
                    itemId: 'googleMapInfo',
                    height: 200
                }
            ]
        });
        this.callParent(arguments);
    },

    loadData: function (record) {
        var photoName,
            image,
            position = {
                coords: {
                    longitude: record.get('longitude'),
                    latitude: record.get('latitude')
                }
            };

        this.down('displayfield#defectTitle').setValue('<h1>' + record.get('title') + '</h1>');
        this.down('displayfield#defectDescription').setValue(record.get('description'));
        this.down('displayfield#defectDate').setValue('Data zgłoszenia: ' + record.getFormattedDate());
        this.down('displayfield#defectStatus').setValue('Status: ' + record.getStatusName());
        this.down('displayfield#defectLocalization').setValue('Lokalizacja: ' + record.getLocalization());


        photoName = record.get('photo');

        //image = this.down('image#defectImage');
        //if (photoName != null && photoName != '') {
        //    image.show();
        //    image.setSrc('../upload/photos/' + photoName);
        //} else {
        //    image.hide();
        //}

        image = this.down('panel#defectImage');
        var img = '<img onload="Ext.ComponentQuery.query(\'defectDetails\')[0].updateLayout()" style="float: right; min-width: 100px; min-height: 100px; max-width: 400px; max-height: 300px;" src="../upload/photos/' + photoName + '" />';
        image.update(img);

        this.down('googleMapInfo#googleMapInfo').loadMap(position);
    }
});


