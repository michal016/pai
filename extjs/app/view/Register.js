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
                            allowBlank: false,
                            labelAlign: 'top',
                            name: 'username'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            allowBlank: false,
                            labelAlign: 'top',
                            name: 'email'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Hasło',
                            allowBlank: false,
                            labelAlign: 'top',
                            inputType: 'password',
                            name: 'password'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Zarejestruj',
                                    margin: '0 10 0 0',
                                    handler: function () {
                                        var form = this.up('form').getForm();

                                        if (form.isValid()) {
                                            form.submit(
                                                {
                                                    waitMsg: 'Rejestracja, proszę czekać',
                                                    url: '../index.php/main/register',
                                                    success: function (form, action) {

                                                        var responseText = Ext.decode(action.response.responseText);

                                                        if (responseText.success) {

                                                            var responseText = Ext.decode(action.response.responseText);

                                                            if (responseText.success) {

                                                                pai.config.Settings.username = responseText.data.username;
                                                                pai.config.Settings.communityId = responseText.data.communityId;
                                                                pai.config.Settings.districtId = responseText.data.districtId;
                                                                pai.config.Settings.voivodshipId = responseText.data.voivodshipId;
                                                                pai.config.Settings.logged = responseText.data.logged;

                                                                var mainPanel = Ext.ComponentQuery.query('app-main')[0],
                                                                    tabpanel = mainPanel.down('tabpanel'),
                                                                    username = mainPanel.down("displayfield#username");

                                                                tabpanel.remove(tabpanel.items.items[3]);
                                                                tabpanel.remove(tabpanel.items.items[2]);
                                                                tabpanel.setActiveItem(0);

                                                                mainPanel.down("button#logoutBtn").show();
                                                                username.show();
                                                                username.setValue(pai.config.Settings.username);

                                                                Ext.Msg.alert('Sukces', 'Rejestracja przebiegła pomyślnie');
                                                                form.reset();
                                                            }
                                                        }
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert('Wystąpił problem', 'Nie udało się zarejestrować');
                                                        console.log(Ext.decode(action.response.responseText).message);
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
                }
            ]
        });
        this.callParent(arguments);
    }
});