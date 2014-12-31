/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.model.District', {
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
            name: 'community_id',
            reference: 'Community'
        },
        {
            name: 'district_id',
            reference: 'District'
        },
        {
            name: 'voivodship_id',
            reference: 'Voivodship'
        }
    ]
});