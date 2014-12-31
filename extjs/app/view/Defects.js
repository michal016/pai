/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.view.Defects', {
    extend: 'Ext.panel.Panel',
    requires: [
        'pai.model.Defect',
        'pai.view.DefectDetails',
        'pai.controller.Main'
    ],
    xtype: 'defectsPanel',
    layout: 'hbox',
    minHeight: 200,
    padding: 20,


    title: 'Przeglądaj usterki',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    width: '50%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
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
                                    listeners: {
                                        'change': function (combobox, newValue) {
                                            var districtCombo = combobox.next('combobox[name=district]'),
                                                defectsStore = Ext.getStore('pai.store.Defects');

                                            districtCombo.getStore().addFilter(
                                                {
                                                    property: 'voivodship_id',
                                                    value: newValue
                                                }
                                            )

                                            defectsStore.addFilter(
                                                {
                                                    id: 'voivodshipFilter',
                                                    property: 'voivodship_id',
                                                    value: newValue
                                                }
                                            )
                                            districtCombo.reset();

                                            defectsStore.removeFilter('districtFilter');
                                            defectsStore.removeFilter('communityFilter');
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

                                            var communityCombo = combobox.next('combobox[name=community]'),
                                                defectsStore = Ext.getStore('pai.store.Defects');

                                            if (newValue != null) {

                                                communityCombo.getStore().addFilter(
                                                    {
                                                        property: 'district_id',
                                                        value: newValue
                                                    }
                                                )

                                                defectsStore.addFilter(
                                                    {
                                                        id: 'districtFilter',
                                                        property: 'district_id',
                                                        value: newValue
                                                    }
                                                )

                                                defectsStore.removeFilter('voivodshipFilter');
                                                defectsStore.removeFilter('communityFilter');
                                            }

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

                                            if (newValue != null) {

                                                defectsStore.addFilter(
                                                    {
                                                        id: 'communityFilter',
                                                        property: 'community_id',
                                                        value: newValue
                                                    }
                                                )
                                                defectsStore.removeFilter('voivodshipFilter');
                                                defectsStore.removeFilter('districtFilter');
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Filtruj',
                            labelAlign: 'top',
                            listeners: {
                                'change': function (textfield, newValue) {
                                    if (newValue != null && newValue.length > 0) {
                                        Ext.getStore('pai.store.Defects').addFilter(
                                            {
                                                id: 'nameFilter',
                                                property: 'title',
                                                anyMatch: true,
                                                value: newValue
                                            }
                                        )
                                    } else {
                                        Ext.getStore('pai.store.Defects').removeFilter('nameFilter');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            store: Ext.getStore('pai.store.Defects'),
                            columns: [
                                {
                                    text: 'Tytuł',
                                    dataIndex: 'title',
                                    width: 200
                                },
                                {
                                    text: 'Data zgłoszenia',
                                    dataIndex: 'create_date',
                                    renderer: function (date) {
                                        return Ext.Date.format(date, 'j.n.Y');
                                    },
                                    width: 120
                                },
                                {
                                    text: 'Status',
                                    dataIndex: 'status',
                                    renderer: function (value, metadata, record) {
                                        return record.getStatusName();
                                    },
                                    width: 100
                                },
                                {
                                    text: 'Gmina',
                                    dataIndex: 'community_id',
                                    renderer: function (value) {
                                        return Ext.getStore('pai.store.Communities').getById(value).get('name');
                                    },
                                    width: 100
                                },
                                {
                                    text: 'Powiat',
                                    dataIndex: 'district_id',
                                    renderer: function (value) {
                                        return Ext.getStore('pai.store.Districts').getById(value).get('name');
                                    },
                                    width: 100
                                },
                                {
                                    text: 'Województwo',
                                    dataIndex: 'voivodship_id',
                                    renderer: function (value) {
                                        return Ext.getStore('pai.store.Voivodships').getById(value).get('name');
                                    },
                                    width: 100
                                }
                            ],
                            listeners: {
                                'select': function (gridpanel, record, index) {
                                    Ext.ComponentQuery.query('defectDetails')[0].loadData(record);
                                }
                            }
                        }

                    ]
                },
                {
                    xtype: 'defectDetails',
                    width: '50%'
                }
         ]
        });
        this.callParent(arguments);
    }
});