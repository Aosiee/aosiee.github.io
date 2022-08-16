var container = document.querySelector('.image-container');
var imgLoad = imagesLoaded(container);

imgLoad.on('progress', function(instance, image) {
    var result;

    if (image.img.classList.contains('half-opacity')) {
        result = image.isLoaded ? 'loaded-half-opacity' : 'broken';
        image.img.classList.add(result);
    }
    if (image.img.classList.contains('half-opacity-third')) {
        result = image.isLoaded ? 'loaded-half-opacity-third' : 'broken';
        image.img.classList.add(result);
    } else {
        result = image.isLoaded ? 'loaded' : 'broken';
        image.img.classList.add(result);
    }
    // console.log("Image Loaded with " + result)
});


// init Isotope
var $grid = $('.dynamic-grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: '.grid-sizer'
    }
});

// layout Isotope after each image loads
$grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
});

// unbind first
$('.filters').off();

// bind filter button click
$('.filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');

    filterIsotopeItems(this, filterValue);
});