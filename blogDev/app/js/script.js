
function setAttr(attrName, attrValue) {
    var eles = Array().slice.call(arguments, 2, arguments.length);
    for (var i = 0; i < eles.length; i++) {
        if (eles[i].hasOwnProperty('length')) {
            for (var j = 0; j < eles[i].length; j++) {
                setAttr(attrName, attrValue, eles[i][j]);
            }
        } else {
            eles[i].style[attrName] = attrValue;            
        }
    }
}

var animation = new Object();
animation.fadeIn = function(e) {
    if (e.relatedTarget != close) {
        nav.style.right = '0px';
        mask.style.opacity = '0.9';
    }

}

window.onload = function() {
    pageInit();
    var banner = document.getElementById('banner');
    var menu = document.getElementById('menu');
    var logo = document.getElementById('logo');
    var cate = document.getElementById('cate');
    var nav = document.getElementById('nav');
    var close = document.getElementById('close');
    var topbar = document.getElementById('topbar');
    var wrapper = document.getElementById('page_wrapper');
    var login = document.getElementById('login');
    var btn_login = document.getElementById('btn_login');
    var register = document.getElementById('register');
    var btn_register = document.getElementById('btn_register');
    var closeModal = document.getElementsByClassName('closeModal');
    var test = document.getElementById('test');
    var test0 = document.getElementById('test0');
    var test1 = document.getElementById('test1');
    dropped = false;
    var loginWidth = 400;
    var currentPage = 1;
    var next = document.getElementsByClassName('next');
    var canscroll = true;
    var changeState = function() {
        canscroll = true;
    }
    var fadeOut = function(e) {
        sidebar.style.right = '-260px';
        mask.style.opacity = '0';
    }

    var drop = function(e) {
        fadeOut();
        if (!dropped) {
            login.style.top = '140px';
            dropped = true;
        } else {
            login.style.top = '-350px';
            dropped = false;
        }
    }
    var drop0 = function() {
        fadeOut();
        if (!dropped) {
            register.style.top = '80px';
            dropped = true;
        } else {
            register.style.top = '-550px';
            dropped = false;
        }

    }
    var wheelListener = function(e) {
        if (canscroll) {
            canscroll = false;
            setTimeout(changeState, 600);
            if (e.wheelDelta < 0 || !e.wheelDelta) {
                if (currentPage == 1) {
                    topbar.style.opacity = 1;
                    logo.style.display = 'block';
                }
                if (currentPage < 3) {
                    wrapper.style.top = (parseInt(wrapper.style.top) || 0) - viewHeight + 'px';
                    currentPage++;
                }
            } else {
                if (currentPage == 2) {
                    topbar.style.opacity = 0;
                    logo.style.display = 'none';
                }
                if (currentPage > 1) {
                    wrapper.style.top = (parseInt(wrapper.style.top) || 0) + viewHeight + 'px';
                    currentPage--;
                }
            }
        }
    }
    for (var i = 0; i < next.length; i++) {
        next[i].addEventListener('click', wheelListener);
    }
    totleHeight = viewHeight * 2;
    login.style.width = loginWidth + 'px'
    login.style.left = (document.body.scrollWidth - loginWidth) / 2 + 'px'
    register.style.width = loginWidth + 'px'
    register.style.left = (document.body.scrollWidth - loginWidth) / 2 + 'px'
    window.addEventListener('mousewheel', wheelListener);
    btn_login.addEventListener('click', drop);
    btn_register.addEventListener('click', drop0);
    closeModal[0].addEventListener('click', drop);
    closeModal[1].addEventListener('click', drop0);
    menu.addEventListener('mouseover', animation.fadeIn);
    mask.addEventListener('mouseover', fadeOut);
    close.addEventListener('click', fadeOut);
    test.onclick = function() {
        test0.setAttribute('class', 'ani');
        test1.setAttribute('class', test1.getAttribute('class') + ' ani1');
    }
    test0.addEventListener('webkitAnimationEnd', function() {
        this.style.left = '184px';
        this.style.height = '500px';
        this.style.width = '700px';
    });
    test1.addEventListener('webkitAnimationEnd', function() {
        this.style.width = '184px';
    })
}
