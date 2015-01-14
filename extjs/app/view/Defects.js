/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.Defects', {
    extend: 'Ext.panel.Panel',
    requires: [
        'pai.model.Defect',
        'pai.view.DefectsList',
        'pai.controller.Main'
    ],
    xtype: 'defectsPanel',

    layout: 'fit',

    title: 'Przeglądaj usterki',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'defectsList'
                }
            ]
        });
        this.callParent(arguments);
    }
});