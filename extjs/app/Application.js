/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching:false
});

Ext.define('pai.Application', {
    extend: 'Ext.app.Application',
    
    name: 'pai',

    controllers: [
        'pai.controller.Main'
    ],

    views: [
    ],

    models: [
        'pai.model.Voivodship',
        'pai.model.District',
        'pai.model.Community',
        'pai.model.Defect'
    ],

    stores: [
        'pai.store.Voivodships',
        'pai.store.Districts',
        'pai.store.Communities'
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
