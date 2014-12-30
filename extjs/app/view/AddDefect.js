/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.AddDefect', {
    extend: 'Ext.panel.Panel',
    xtype: 'addDefectPanel',

    title: 'Dodaj usterkę',

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
                        },
                        {
                            xtype: 'textfield',
                            name: 'title',
                            labelAlign: 'top',
                            fieldLabel: 'Tytuł',
                            allowBlank: false
                        },
                        {
                            xtype: 'textarea',
                            name: 'description',
                            labelAlign: 'top',
                            fieldLabel: 'Opis problemu'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Zapisz',
                            handler: function () {
                                var form = this.up('form').getForm();

                                if (form.isValid()) {
                                    form.submit(
                                        {
                                            success: function (form, action) {
                                                Ext.Msg.alert('Zapisano', 'Usterka została poprawnie zapisana');
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
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
})