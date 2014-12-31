/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.AddDefect', {
    extend: 'Ext.panel.Panel',
    xtype: 'addDefectPanel',

    requires: [
        'pai.view.GoogleMap'
    ],

    title: 'Dodaj usterkę',
    layout: 'hbox',
    padding: 20,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'addDefectForm',
                    url: '../index.php/defect/create',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10 0 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'voivodship',
                                    fieldLabel: 'Województwo',
                                    labelAlign: 'top',
                                    valueField: 'id',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'pai.store.Voivodships',
                                    allowBlank: false,
                                    listeners: {
                                        'change': function (combobox, newValue) {
                                            var districtCombo = combobox.next('combobox[name=district]');

                                            districtCombo.getStore().addFilter(
                                                {
                                                    property: 'voivodship_id',
                                                    value: newValue
                                                }
                                            )
                                            districtCombo.reset();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'district',
                                    fieldLabel: 'Powiat',
                                    labelAlign: 'top',
                                    valueField: 'id',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'pai.store.Districts',
                                    allowBlank: false,
                                    listeners: {
                                        'change': function (combobox, newValue) {
                                            var communityCombo = combobox.next('combobox[name=community]');

                                            communityCombo.getStore().addFilter(
                                                {
                                                    property: 'district_id',
                                                    value: newValue
                                                }
                                            )
                                            communityCombo.reset();
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'community',
                                    fieldLabel: 'Gmina',
                                    labelAlign: 'top',
                                    valueField: 'id',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'pai.store.Communities',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '0 10 0 0',
                                    name: 'longitude',
                                    fieldLabel: 'Długość geograficzna',
                                    labelAlign: 'top',
                                    editable: false,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'latitude',
                                    fieldLabel: 'Szerokość geograficzna',
                                    labelAlign: 'top',
                                    editable: false,
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'title',
                            labelAlign: 'top',
                            fieldLabel: 'Tytuł',
                            allowBlank: false,
                            width: 530
                        },
                        {
                            xtype: 'textarea',
                            name: 'description',
                            labelAlign: 'top',
                            fieldLabel: 'Opis problemu',
                            width: 530,
                            height: 200
                        },
                        //{
                        //    xtype: 'filefield',
                        //    width: 530,
                        //    name: 'photo',
                        //    fieldLabel: 'Zdjęcie',
                        //    labelAlign: 'top',
                        //    msgTarget: 'side',
                        //    allowBlank: true,
                        //    buttonText: 'Wybierz'
                        //},
                        {
                            xtype: 'container',
                            width: 530,
                            layout: {
                                type: 'hbox',
                                align: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Zapisz',
                                    margin: '0 10 0 0',
                                    handler: function () {
                                        var form = this.up('form').getForm();

                                        if (form.isValid()) {
                                            form.submit(
                                                {
                                                    success: function (form, action) {
                                                        Ext.Msg.alert('Zapisano', 'Usterka została poprawnie zapisana');
                                                        form.reset();
                                                    }
                                                },
                                                {
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert('Wystąpił problem', 'Nie udało się zapisać usterki');
                                                    }
                                                }
                                            )
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Wyczyść',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'googleMap',
                    width: '100%',
                    height: 340
                }
            ]
        });
        this.callParent(arguments);
    }
})