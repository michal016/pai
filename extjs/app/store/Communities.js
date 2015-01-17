/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.store.Communities', {
    extend: 'Ext.data.Store',
    model: 'pai.model.Community',
    proxy: {
        type: 'ajax',
        url: '../index.php/main/read-communities',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});