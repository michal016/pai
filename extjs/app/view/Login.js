/**
 * Created by Michał on 2015-01-15.
 */
Ext.define('pai.view.Login', {
    extend: 'Ext.panel.Panel',
    requires: [
        'pai.config.Settings'
    ],
    xtype: 'loginPanel',

    layout: 'fit',

    title: 'Zaloguj się',

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
                            xtype: 'textfield',
                            fieldLabel: 'Login',
                            allowBlank: false,
                            labelAlign: 'top',
                            name: 'username'
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
                            xtype: 'checkbox',
                            fieldLabel: 'Zapamiętaj mnie',
                            name: 'rememberMe'
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
                                    text: 'Zaloguj się',
                                    margin: '0 10 0 0',
                                    handler: function () {
                                        var form = this.up('form').getForm();

                                        if (form.isValid()) {
                                            form.submit(
                                                {
                                                    waitMsg: 'Logowanie, proszę czekać',
                                                    url: '../index.php/main/login',
                                                    success: function (form, action) {

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

                                                        } else {
                                                            Ext.Msg.alert('Wystąpił problem', responseText.message);
                                                        }
                                                    },
                                                    failure: function (form, action) {
                                                        Ext.Msg.alert('Wystąpił problem', 'Nie udało się zalogować');
                                                    }
                                                }
                                            )
                                        }
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