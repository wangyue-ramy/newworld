function base() {
    var eventListeners = {}
    var nav = document.getElementById('nav');
    var menu = document.getElementById('menu');
    var ajaxBtn = document.getElementById('ajaxBtn');

    eventListeners.navSlide = function(e) {
        nav.style.right = nav.style.right || '-260px';
        if (nav.style.right == '-260px') {
            nav.style.right = '0px';
        } else {
            nav.style.right = '-260px';
        }
    }

    eventListeners.ajax = function() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                alert(xhr.responseText);
            }
        }
        xhr.open('get', '/blog/ajax', true);
        xhr.send(null);
    }

    menu.addEventListener('mouseover', eventListeners.navSlide);
    nav.addEventListener('mouseleave', eventListeners.navSlide);
    ajaxBtn.addEventListener('click', eventListeners.ajax);

}
