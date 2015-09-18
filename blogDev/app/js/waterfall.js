var waterfall = (function() {
    var width = (document.documentElement.clientWidth) * 0.9;
    var gap = 3;
    var eachOffsetWidth = (width - (gap * 10)) / 5;
    var hpadding = 5;
    var borderWidth = 2;
    var imgWidth = eachOffsetWidth - 2 * hpadding - 2 * borderWidth;
    console.log(document.documentElement.clientWidth, width, eachOffsetWidth, hpadding, borderWidth, imgWidth);

    function init() {
        var wrapper = document.getElementById('waterfallWrapper');
        var imgs = document.getElementsByTagName('img');
        wrapper.style.width = width + 'px';
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.width = imgWidth + 'px';
        }
    }

    return {
        init: init
    }
})();

window.addEventListener('load', waterfall.init);