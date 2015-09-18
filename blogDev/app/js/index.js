window.addEventListener('load', function() {
    var body = document.body;
    var pageWrapper = document.getElementById('page_wrapper');
    var screenHeight = document.documentElement.clientHeight;
    var pages = document.getElementsByClassName('page');
    var topBar = document.getElementById('topbar');
    var menu = document.getElementById('menu');
    var nav = document.getElementById('nav');
    var logo = document.getElementById('logo');
    var ajaxBtn = document.getElementById('ajaxBtn');

    //创建事件响应函数的集合，用一个单例容纳。
    var listeners = (function() {
        var curPage = 1;
        var scrollState = true;
        var changeState = function() {
            scrollState = true;
        }
        return {
            scrollPage: function(e) {
                if (scrollState) {
                    scrollState = false;
                    setTimeout(changeState, 600);
                    if ((e.wheelDelta < 0 || e.keyCode == 40) && curPage < 3) {
                        pageWrapper.style.top = parseInt(pageWrapper.style.top || 0) - screenHeight + 'px';
                        curPage++;
                    }
                    if ((e.wheelDelta > 0 || e.keyCode == 38) && curPage > 1) {
                        pageWrapper.style.top = parseInt(pageWrapper.style.top || 0) + screenHeight + 'px';
                        curPage--;
                    }
                    if (curPage == 1) {
                        topBar.style.opacity = 0;
                    } else {
                        topBar.style.opacity = 1;
                    }
                }
            },
            navSlide: function(e) {
                nav.style.right = nav.style.right || '-260px';
                if (nav.style.right == '-260px') {
                    nav.style.right = '0px';
                }
                //在父元素内部移动鼠标还会触发mouseout,只好把relatedTarget设置为父元素以外的元素，找找别的更高效优雅的方法
                //找到了！！！！！！！！！！！！！！用mouseleave！！！书中自有黄金屋！！！！！！！！！
                else  {
                    nav.style.right = '-260px';
                }
            },
            ajax: function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        alert(xhr.responseText);
                    }
                }
                xhr.open('get', '/blog/ajax', true);
                xhr.send(null);
            }
        }
    })();

    var init = (function() {
        body.style.height = screenHeight + 'px';
        pageWrapper.style.height = screenHeight * pages.length + 'px';
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.height = screenHeight + 'px';
        }
        return true;
    })();
    window.addEventListener('mousewheel', listeners.scrollPage);
    menu.addEventListener('mouseover', listeners.navSlide);
    nav.addEventListener('mouseleave', listeners.navSlide);
    window.addEventListener('keydown', listeners.scrollPage);
    ajaxBtn.addEventListener('click', listeners.ajax);
});
