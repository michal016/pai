/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.store.Districts', {
    extend: 'Ext.data.Store',
    model: 'pai.model.District',
    proxy: {
        type: 'ajax',
        url: '../index.php/main/read-districts',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});