/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.DefectDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'defectDetails',
    requires: [
        'pai.view.GoogleMapInfo'
    ],
    padding: '20 20 20 10',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    maxHeight: 300,
                    margin: '0 0 20 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            padding: '0 20 0 0',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'defectTitle'
                                },
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
                                    itemId: 'defectDescription'
                                }
                            ]
                        },
                        {
                            xtype: 'image',
                            flex: 1,
                            src: '',
                            itemId: 'defectImage'
                        }
                    ]
                },
                {
                    xtype: 'googleMapInfo',
                    itemId: 'googleMapInfo',
                    //width: '100%',
                    height: 350
                }
            ]
        });
        this.callParent(arguments);
    },

    loadData: function(record) {
        var photoName,
            image,
            position = {
            coords: {
                longitude: record.get('longitude'),
                latitude: record.get('latitude')
            }
        };

        this.down('displayfield#defectTitle').setValue('<h1>' + record.get('title') +'</h1>');
        this.down('displayfield#defectDescription').setValue(record.get('description'));
        this.down('displayfield#defectDate').setValue('Data zgłoszenia: ' + record.getFormattedDate());
        this.down('displayfield#defectStatus').setValue('Status: ' + record.getStatusName());
        this.down('displayfield#defectLocalization').setValue('Lokalizacja: ' + record.getLocalization());

        photoName = record.get('photo');
        image = this.down('image#defectImage');
        if (photoName != null && photoName != '') {
            image.show();
            image.setSrc('../upload/photos/' + photoName);
        } else {
            image.hide();
        }


        this.down('googleMapInfo#googleMapInfo').loadMap(position);

        this.doLayout();
    }
});


