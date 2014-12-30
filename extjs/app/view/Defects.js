/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.Defects', {
    extend: 'Ext.panel.Panel',
    xtype: 'defectsPanel',

    title: 'Przeglądaj usterki',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
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
                    },
                    allowBlank: false
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
                    },
                    allowBlank: false
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
                    allowBlank: false,
                    listeners: {
                        'change': function (combobox, newValue) {
                            var defectsStore = Ext.getStore('pai.store.Defects');

                            defectsStore.addFilter(
                                {
                                    property: 'community_id',
                                    value: newValue
                                }
                            )
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    store: Ext.getStore('pai.store.Defects'),
                    columns: [
                        {
                            text: 'Tytuł',
                            dataIndex: 'title'
                        },
                        {
                            text: 'Data zgłoszenia',
                            dataIndex: 'create_date'
                        },
                        {
                            text: 'Status',
                            dataIndex: 'status'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});