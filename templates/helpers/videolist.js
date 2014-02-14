module.exports.register = function (Handlebars, options, params) {
    'use strict';

    Handlebars.registerHelper('videolist', function(video) {
        var out = "";
        if (video.youtube) {
            out += '<a href="http://www.youtube.com/watch?v=' + video.youtube + '">YouTube</a>, ';
        }
        if (video.vimeo) {
            out += '<a href="http://www.vimeo.com/' + video.vimeo + '">Vimeo</a>, ';
        }
        if (video.mp4) {
            out += '<a href="trailers/' + video.mp4 + '">.mp4</a>, ';
        }

        out = out.slice(0,-2);

        if (video.youtube || video.vimeo) {
            out += '<div class="videoWrapper">';

            var key;
            for (key in video) {
                if (key == "youtube") {
                    out += '<iframe src="http://www.youtube.com/embed/' + video.youtube + '" frameborder="0" allowfullscreen></iframe>';
                    break;
                }
                if (key == "vimeo") {
                    out += '<iframe src="http://player.vimeo.com/video/' + video.vimeo + '" frameborder="0" allowfullscreen></iframe>';
                    break;
                }
            }

            out += '</div>'
        }

        return new Handlebars.SafeString(out);
    });
};