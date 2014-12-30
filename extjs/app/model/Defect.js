/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.model.Defect', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'create_date',
            type: 'date'
        },
        {
            name: 'status',
            type: 'int'
        },
        {
            name: 'photo',
            type: 'string'
        },
        {
            name: 'longitude',
            type: 'float'
        },
        {
            name: 'latitude',
            type: 'float'
        },
        {
            name: 'community_id',
            reference: 'Community'
        }
    ]
});