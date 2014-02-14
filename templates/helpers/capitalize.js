module.exports.register = function (Handlebars, options, params) {
    'use strict';

    Handlebars.registerHelper('capitalize', function(text) {
        text = text.replace('_',' ');
        text = text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        return new Handlebars.SafeString(text);
    });
};