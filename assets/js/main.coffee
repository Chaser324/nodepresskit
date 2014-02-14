
initImageGallery = ->
    container = $('.image-grid')
    container.imagesLoaded ->
        container.masonry
            itemSelector: '.col-md-6'
            columnWidth: '.col-md-6'

$(window).ready ->
    initImageGallery()