/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'pai.view.DetailsWindow',
        'pai.config.Settings'
    ],

    init: function() {
        var viewSize = Ext.getBody().getViewSize(),
            communityStore = Ext.getStore('pai.store.Communities'),
            districtStore = Ext.getStore('pai.store.Districts'),
            voivodshipStore = Ext.getStore('pai.store.Voivodships');

        communityStore.load();
        districtStore.load();
        voivodshipStore.load();

        voivodshipStore.on('load', function () {
            Ext.getStore('pai.store.Defects').load();
        });

        voivodshipStore.on('load', this.checkIfLogged);

        this.detailsWindow = Ext.create('pai.view.DetailsWindow', {
            hidden: true,
            width: 800,
            height: 500
        });

        Ext.getStore('pai.store.Defects').addFilter(
            {
                id: 'statusFilter',
                property: 'status',
                operator: '!=',
                value: pai.model.Defect.STATUS_RESOLVED
            }
        );


    },

    showDetailsWindow: function() {
        this.detailsWindow.show();
    },

    checkIfLogged: function () {
        Ext.Ajax.request({
            url: '../index.php/main/logged',
            success: function(response, opts) {
                var responseText = Ext.decode(response.responseText);

                if (responseText.success) {

                    pai.config.Settings.username = responseText.data.username;
                    pai.config.Settings.communityId = responseText.data.communityId;
                    pai.config.Settings.districtId = responseText.data.districtId;
                    pai.config.Settings.voivodshipId = responseText.data.voivodshipId;
                    pai.config.Settings.logged = responseText.data.logged;

                    if (pai.config.Settings.logged) {

                        var mainPanel = Ext.ComponentQuery.query('app-main')[0],
                            tabpanel = mainPanel.down('tabpanel'),
                            username = mainPanel.down("displayfield#username");

                        tabpanel.remove(tabpanel.items.items[3]);
                        tabpanel.remove(tabpanel.items.items[2]);
                        tabpanel.setActiveItem(0);

                        mainPanel.down("button#logoutBtn").show();
                        username.show();
                        username.setValue(pai.config.Settings.getLoggedInfo());
                    }
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
});




