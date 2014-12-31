/**
 * Created by Michał on 2014-12-30.
 */
Ext.define('pai.model.Defect', {
    extend: 'Ext.data.Model',

    statics: {
        STATUS_REPORTED: 0,
        STATUS_RESOLVED: 1,
        STATUS_IN_PROGRESS: 2
    },

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
    ],

    getStatusName: function () {
        switch (this.get('status')) {
            case pai.model.Defect.STATUS_REPORTED:
                return 'Zgłoszone';
            case pai.model.Defect.STATUS_RESOLVED:
                return 'Rozwiązane';
            case pai.model.Defect.STATUS_IN_PROGRESS:
                return 'W toku';
        }
        return 'Nieznany';
    }
});