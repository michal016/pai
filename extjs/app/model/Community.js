/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.model.Community', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'district_id',
            reference: 'District'
        }
    ]
});