/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.store.Defects', {
    extend: 'Ext.data.Store',
    model: 'pai.model.Defect',
    storeId: 'defects',
    proxy: {
        type: 'ajax',
        url: '../index.php/defect/read',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});