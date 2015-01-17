/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.store.Voivodships', {
    extend: 'Ext.data.Store',
    model: 'pai.model.Voivodship',
    proxy: {
        type: 'ajax',
        url: '../index.php/main/read-voivodships',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }//,
    //autoLoad: true
});