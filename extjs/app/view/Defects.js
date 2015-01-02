/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.Defects', {
    extend: 'Ext.panel.Panel',
    requires: [
        'pai.model.Defect',
        'pai.view.DefectDetails',
        'pai.view.DefectsList',
        'pai.controller.Main'
    ],
    xtype: 'defectsPanel',

    layout: 'hbox',

    title: 'Przeglądaj usterki',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    width: '50%',
                    xtype: 'defectsList'
                },
                {
                    width: '50%',
                    xtype: 'defectDetails'
                }
         ]
        });
        this.callParent(arguments);
    }
});