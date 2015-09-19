function index() {
    var body = document.body;
    var pageWrapper = document.getElementById('page_wrapper');
    var screenHeight = document.documentElement.clientHeight;
    var pages = document.getElementsByClassName('page');
    var topBar = document.getElementById('topbar');

    //创建事件响应函数的集合，用一个单例容纳。
    var scrollPage = (function() {
        var curPage = 1;
        var scrollState = true;
        var changeState = function() {
            scrollState = true;
        }
        return function(e) {
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
        }
    })();

    var init = (function() {
        body.style.overflow = 'hidden';
        body.style.height = screenHeight + 'px';
        pageWrapper.style.height = screenHeight * pages.length + 'px';
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.height = screenHeight + 'px';
        }
        return true;
    })();
    base();
    window.addEventListener('mousewheel', scrollPage);
    window.addEventListener('keydown', scrollPage);
};

window.addEventListener('load', index);