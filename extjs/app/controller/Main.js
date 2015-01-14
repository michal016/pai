/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'pai.view.DetailsWindow'
    ],

    init: function() {
        var viewSize = Ext.getBody().getViewSize();

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
        )
    },

    showDetailsWindow: function() {
        this.detailsWindow.show();
    }
});