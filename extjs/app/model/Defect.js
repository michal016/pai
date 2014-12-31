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
    },

    getCommunity: function () {
        return Ext.getStore('pai.store.Communities').getById(this.get('community_id')).get('name');
    },

    getDistrict: function () {
        return Ext.getStore('pai.store.Districts').getById(this.get('district_id')).get('name');
    },

    getVoivodship: function () {
        return Ext.getStore('pai.store.Voivodships').getById(this.get('voivodship_id')).get('name');
    },

    getFormattedDate: function () {
        return Ext.Date.format(this.get('create_date'), 'j.n.Y');
    },

    getLocalization: function () {
        return this.getCommunity() + ', ' + this.getDistrict() + ', ' + this.getVoivodship();
    }
});