/**
 * Created by Michał on 2015-01-15.
 */

Ext.define('pai.config.Settings', {
    singleton: true,
    username: '',
    communityId: '',
    districtId: '',
    voivodshipId: '',
    logged: false,

    getLoggedInfo: function () {
        if (this.logged) {
            var community = Ext.getStore('pai.store.Communities').getById(this.communityId).data.name,
                district = Ext.getStore('pai.store.Districts').getById(this.districtId).data.name,
                voivodship = Ext.getStore('pai.store.Voivodships').getById(this.voivodshipId).data.name;

            return this.username + ' - ' + voivodship + ', ' + district + ', ' + community;
        } else {
            return '';
        }
    }
});