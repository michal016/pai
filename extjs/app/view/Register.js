/**
 * Created by Michał on 2015-01-14.
 */
Ext.define('pai.view.Register', {
    extend: 'Ext.panel.Panel',
    requires: [
    ],
    xtype: 'registerPanel',

    layout: 'fit',

    title: 'Zarejestruj się',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 50 0',
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
                            xtype: 'textfield',
                            fieldLabel: 'Login',
                            labelAlign: 'top',
                            name: 'username'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            labelAlign: 'top',
                            name: 'email'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Hasło',
                            labelAlign: 'top',
                            name: 'password'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});