/**
 * Created by Michał on 2015-01-13.
 */
Ext.define('pai.view.DetailsWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'pai.view.DefectDetails'
    ],

    closeAction: 'hide',

    overflowY: 'auto',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'defectDetails'
                }
            ]
        });
        this.callParent(arguments);
    }
});