/**
 * Created by Michał on 2014-12-31.
 */
Ext.define('pai.view.DefectDetails', {
    extend: 'Ext.Container',
    xtype: 'defectDetails',
    requires: [
        'pai.view.GoogleMapInfo',
        'pai.config.Settings'
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
                    columnWidth: 0.55,
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
                            xtype: 'label',
                            itemId: 'defectDescription',
                            shrinkWrap: true
                        }
                    ]
                },
                {
                    columnWidth: 0.4,
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
                    height: 300,
                    margin: '10 0 10 0'
                },
                {
                    columnWidth: 1,
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'progressBtn',
                            margin: '10 0 10 0',
                            text: 'Oznacz trwającą naprawę',
                            listeners: {
                                click: function () {

                                    Ext.Msg.show({
                                        title: 'Czy jesteś pewien?',
                                        message: 'Czy na pewno chcesz oznaczyć usterkę, jako w trakcie naprawy?',
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.Msg.QUESTION,
                                        fn: function(btn) {
                                            if (btn === 'yes') {

                                                var record = Ext.ComponentQuery.query('defectsList gridpanel')[0].getSelection();

                                                if (record.length == 1) {
                                                    record = record[0];

                                                    Ext.Ajax.request({
                                                        url: '../index.php/defect/make-resolved',
                                                        params: {
                                                            defectId: record.get('id'),
                                                            status: pai.model.Defect.STATUS_IN_PROGRESS
                                                        },
                                                        success: function(response, opts) {
                                                            var responseText = Ext.decode(response.responseText);
                                                            Ext.Msg.show({
                                                                    title: 'Informacja',
                                                                    message: responseText.message,
                                                                    buttons: Ext.Msg.OK
                                                            });

                                                            Ext.getStore('pai.store.Defects').load();
                                                        },
                                                        failure: function(response, opts) {
                                                            console.log('server-side failure with status code ' + response.status);
                                                        }
                                                    });

                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'resolvedBtn',
                            text: 'Oznacz jako naprawioną',
                            listeners: {
                                click: function () {

                                    Ext.Msg.show({
                                        title:'Czy jesteś pewien?',
                                        message: 'Czy na pewno chcesz oznaczyć usterkę, jako zrealizowaną?',
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.Msg.QUESTION,
                                        fn: function(btn) {
                                            if (btn === 'yes') {

                                                var record = Ext.ComponentQuery.query('defectsList gridpanel')[0].getSelection();

                                                if (record.length == 1) {
                                                    record = record[0];

                                                    Ext.Ajax.request({
                                                        url: '../index.php/defect/make-resolved',
                                                        params: {
                                                            defectId: record.get('id'),
                                                            status: pai.model.Defect.STATUS_RESOLVED
                                                        },
                                                        success: function(response, opts) {
                                                            var responseText = Ext.decode(response.responseText);
                                                            Ext.Msg.show({
                                                                title: 'Informacja',
                                                                message: responseText.message,
                                                                buttons: Ext.Msg.OK
                                                            });

                                                            Ext.getStore('pai.store.Defects').load();
                                                        },
                                                        failure: function(response, opts) {
                                                            console.log('server-side failure with status code ' + response.status);
                                                        }
                                                    });

                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },

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
        this.down('label#defectDescription').setText(record.get('description'));
        this.down('displayfield#defectDate').setValue('Data zgłoszenia: ' + record.getFormattedDate());
        this.down('displayfield#defectStatus').setValue('Status: ' + record.getStatusName());
        this.down('displayfield#defectLocalization').setValue('Lokalizacja: ' + record.getLocalization());


        photoName = record.get('photo');
        image = this.down('panel#defectImage');

        if (photoName != null && photoName != '') {
            image.show();
            var img = '<img alt="" onload="Ext.ComponentQuery.query(\'defectDetails\')[0].updateLayout()" style="float: right; min-width: 100px; min-height: 100px; max-width: 300px; max-height: 200px;" src="../upload/photos/' + photoName + '" />';
            image.update(img);
        } else {
            image.hide();
        }

        this.down('googleMapInfo#googleMapInfo').loadMap(position);

        if (pai.config.Settings.logged && record.get('community_id') == pai.config.Settings.communityId) {

            if (record.get('status') == pai.model.Defect.STATUS_IN_PROGRESS) {
                this.down('button#progressBtn').hide();
                this.down('button#resolvedBtn').show();
            } else if (record.get('status') == pai.model.Defect.STATUS_RESOLVED) {
                this.down('button#progressBtn').hide();
                this.down('button#resolvedBtn').hide();
            } else {
                this.down('button#progressBtn').show();
                this.down('button#resolvedBtn').show();
            }
        } else {
            this.down('button#progressBtn').hide();
            this.down('button#resolvedBtn').hide();
        }
    }
});


