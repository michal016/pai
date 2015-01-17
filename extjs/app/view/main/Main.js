/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('pai.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'pai.view.main.MainController',
        'pai.view.main.MainModel',
        'pai.view.AddDefect',
        'pai.view.DefectsList',
        'pai.view.Register',
        'pai.view.Login'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'fit',

    statics: {
        username: '',
        community: null,
        district: null,
        voivodship: null
    },

    initComponent: function () {

        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'loggedBox',
                            height: 40,
                            style: 'background-color: #157fcc;',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldStyle: 'font-size: 20px; font-weight: bold; color: white; background-color: #157fcc',
                                    value: 'Usterka',
                                    margin: '0 0 0 15'
                                },
                                {
                                    xtype: 'component',
                                    flex: 1,
                                    fieldStyle: 'background-color: #157fcc;'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'username',
                                    fieldStyle: 'font-size: 16px; font-weight: bold; color: white; background-color: #157fcc',
                                    hidden: true,
                                    margin: '0 20 0 0'
                                },
                                {
                                    xtype: 'button',
                                    hidden: true,
                                    itemId: 'logoutBtn',
                                    margin: '0 20 0 0',
                                    text: 'Wyloguj',
                                    handler: function () {
                                        Ext.Ajax.request({
                                            url: '../index.php/main/logout',
                                            success: function(response, opts) {
                                                var responseText = Ext.decode(response.responseText);

                                                if (responseText.success) {

                                                    me.down('displayfield#username').hide();
                                                    me.down('button#logoutBtn').hide();

                                                    me.down('tabpanel').add(Ext.create('pai.view.Register'));
                                                    me.down('tabpanel').add(Ext.create('pai.view.Login'));

                                                }

                                            },
                                            failure: function(response, opts) {

                                                var responseText = Ext.decode(response.responseText);

                                                Ext.Msg.show({
                                                    title: 'Informacja',
                                                    message: responseText.message,
                                                    buttons: Ext.Msg.OK
                                                });
                                            }
                                        });
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            height: Ext.getBody().getViewSize().height - 40,
                            items: [
                                {
                                    xtype: 'defectsList'
                                },
                                {
                                    xtype: 'addDefectPanel'
                                },
                                {
                                    xtype: 'registerPanel'
                                },
                                {
                                    xtype: 'loginPanel'
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
