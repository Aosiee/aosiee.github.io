let container = document.querySelector('.image-container');
let imgLoad = imagesLoaded(container);

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


// external js: isotope.pkgd.js

// init Isotope
var $grid = $('.dynamic-grid').isotope({
    itemSelector: '.color-shape'
});

// store filter for each group
var filters = {};

$('.filters').on('change', function(event) {
    var $select = $(event.target);
    // get group key
    var filterGroup = $select.attr('value-group');
    // set filter for group
    filters[filterGroup] = event.target.value;
    // combine filters
    var filterValue = concatValues(filters);
    // set filter for Isotope
    $grid.isotope({ filter: filterValue });
});

// flatten object by concatting values
function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
        value += obj[prop];
    }
    return value;
}


// layout Isotope after each image loads
$grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
});

// filter functions
var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function() {
        var name = $(this).find('.name').text();
        return name.match(/ium$/);
    }
};

// bind filter button click
$('#filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on('click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});