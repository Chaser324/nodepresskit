module.exports.register = function (Handlebars, options, params) {
    'use strict';

    Handlebars.registerHelper('parselink', function(url) {
        var parsed = url.trim();
        if (parsed.indexOf("http://") == 0)
            parsed = parsed.substr(7);
        if (parsed.indexOf("https://") == 0)
            parsed = parsed.substr(8);
        if (parsed.indexOf("www.") == 0)
            parsed = parsed.substr(4);
        if (parsed.indexOf("http://") == 0)
            parsed = parsed.substr(7);
        if (parsed.indexOf("/") == parsed.length - 1)
            parsed = parsed.substr(0, parsed.length - 1);

        return new Handlebars.SafeString(parsed);
    });
};