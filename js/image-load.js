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