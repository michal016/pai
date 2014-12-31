/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.DefectDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'defectDetails',
    requires: [
        'pai.view.GoogleMapInfo'
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'displayfield',
                    itemId: 'defectTitle'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'defectDescription'
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
                    itemId: 'defectCommunity'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'defectDistrict'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'defectVoivodship'
                },
                {
                    xtype: 'googleMapInfo',
                    itemId: 'googleMapInfo',
                    width: '100%',
                    height: 350
                }
            ]
        });
        this.callParent(arguments);
    },

    loadData: function(record) {
        var position = {
            coords: {
                longitude: record.get('longitude'),
                latitude: record.get('latitude')
            }
        };

        this.down('displayfield#defectTitle').setValue('<h1>' + record.get('title') +'</h1>');
        this.down('displayfield#defectDescription').setValue(record.get('description'));
        this.down('displayfield#defectDate').setValue(record.getFormattedDate());
        this.down('displayfield#defectStatus').setValue(record.getStatusName());
        this.down('displayfield#defectCommunity').setValue(record.getLocalization());

        this.down('googleMapInfo#googleMapInfo').loadMap(position);
    }
});


