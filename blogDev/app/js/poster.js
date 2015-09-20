function poster() {
    base();
    var contentWrap = document.getElementsByClassName('contentWrap')[0];
    var posterWraps = document.getElementsByClassName('posterWrap');
    posterWraps = Array.prototype.slice.call(posterWraps, 0);
    var posters = document.getElementsByClassName('poster');
    var n = Math.floor(Math.random() * posterWraps.length);
    var center = posterWraps[n];
    console.log(center.className);
    center.className += ' center';
    for (var i = 0; i < posterWraps.length; i++) {
        middle(posterWraps[i]);
        posters[i].addEventListener('click', turn);
    }

    function init(posterWraps) {

        posterWraps.sort(function(x) {
            return 0.5 - Math.random()
        });

        var left = posterWraps.slice(0, Math.ceil(posterWraps.length / 2));
        var right = posterWraps.slice(Math.ceil(posterWraps.length / 2));
        for (var i = 0; i < left.length; i++) {
            if (left[i] !== center) {
                left[i].style.left = random(-250, 400) + 'px';
                left[i].style.top = random(-100, 450) + 'px';
                left[i].style.transform = 'rotate(' + random(-500, 500) + 'deg) scale(1)'
            }
        }
        for (var i = 0; i < right.length; i++) {
            if (right[i] !== center) {
                right[i].style.left = random(700, 1300) + 'px';
                right[i].style.top = random(-100, 450) + 'px';
                right[i].style.transform = 'rotate(' + random(-500, 500) + 'deg) scale(1)'
            }
        }
    }
    init(posterWraps);

    function random(min, max) {
        var diff = max - min;
        return Math.floor(Math.random() * diff + min);
    }

    function middle(elem) {
        elem.style.top = (contentWrap.clientHeight - elem.offsetHeight) / 2 + 'px';
        elem.style.left = (contentWrap.clientWidth - elem.offsetWidth) / 2 + 'px';
        elem.style.transform = 'rotate(0deg) scale(1.3)';
    }

    function turn() {
        var cls = this.className;
        if (!/center/.test(this.parentNode.className)) {
            this.parentNode.className += ' center';
            center.className = center.className.replace('center', '');
            center = this.parentNode;
            middle(center);
            init(posterWraps);
            return false;
        }
        if (/poster_front/.test(this.className)) {
            cls = cls.replace(/poster_front/, 'poster_back');
        } else {
            cls = cls.replace(/poster_back/, 'poster_front');
        }
        return this.className = cls;
    }


}

window.addEventListener('load', poster);
