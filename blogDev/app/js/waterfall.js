function waterfall() {
    var html = document.documentElement;
    var body = document.body;
    var wrapper = document.getElementById('waterfallWrapper');
    var topbar = document.getElementById('topbar');
    var imgs = document.getElementsByTagName('img');
    var settings = {
        wrapWidth: html.clientWidth * 0.9,
        margin: 3,
        padding: 5,
        borderWidth: 2
    }
    var imgOffsetWidth = (settings.wrapWidth - (settings.margin * 10)) / 5;
    var imgWidth = imgOffsetWidth - 2 * settings.padding - 2 * settings.borderWidth;
    var boxWidth = imgOffsetWidth + 2 * settings.margin;
    var heights = [];

    var init = (function() {
        body.scrollTop = 0;
        wrapper.style.width = settings.wrapWidth + 'px';
        wrapper.style.top = '50px';
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.width = imgWidth + 'px';
            if (i < 5) {
                heights[i] = imgs[i].offsetHeight;
            } else {
                getRightPos(imgs[i]);
            }
        }
        return true;
    })();

    function getRightPos(img) {
        img.style.width = imgWidth + 'px';
        var j = minHeightIndex(heights);
        img.style.position = 'absolute';
        img.style.left = boxWidth * j + 'px';
        img.style.top = heights[j] + settings.margin + 'px';
        heights[j] = heights[j] + img.offsetHeight + settings.margin;
    }

    function minHeightIndex(arr) {
        var min = 0;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < arr[min]) {
                min = i;
            }
        }
        return min;
    }

    function loadImgs(e) {
        if (html.clientHeight + body.scrollTop > html.scrollHeight - 200) {
            for (var i = 0; i < 5; i++) {
                img = document.createElement('img');
                img.src = '/static/blog/' + Math.ceil(Math.random() * 12) + '.jpg';
                wrapper.appendChild(img);
                getRightPos(img);
            }
        }
        if (body.scrollTop > 120) {
            topbar.style.opacity = 0;
        } else {
            topbar.style.opacity = 1;
        }
    }
    base();
    window.addEventListener('scroll', loadImgs);
};

window.addEventListener('load', waterfall);
