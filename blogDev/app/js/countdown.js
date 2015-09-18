start = new Date().getTime();
const LEFT = 220;
const TOP = 100;
const R = 7;
position = [
    LEFT,
    LEFT + 16 * (R + 1),
    LEFT + 30 * (R + 1),
    LEFT + 38 * (R + 1),
    LEFT + 54 * (R + 1),
    LEFT + 68 * (R + 1),
    LEFT + 76 * (R + 1),
    LEFT + 92 * (R + 1),
];
colors = ['#00f', '#0f0', '#f00', '#cc2584', '#5a6877', '#038825', '#aac814', '#85bf33', '#665799', '#c9f9a2'];
canvas_height = document.body.scrollHeight;
canvas_width = document.body.clientWidth;
oTime = new Date();
endTime = new Date(oTime.getFullYear(), oTime.getMonth(), oTime.getDate(), 24, 00, 00);
interval = 20;
balls = [];
window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');


    canvas.height = canvas_height;
    canvas.width = canvas_width;

    var oldTime = calTime();


    setInterval(render, interval);

    function render() {

        var curTime = calTime();
        context.clearRect(0, 0, canvas_width, canvas_height);
        for (var i = 0; i < 8; i++) {
            renderDigit(position[i], oldTime[i]);
            if (oldTime[i] != curTime[i]) {
                addBalls(position[i], oldTime[i]);
                oldTime[i] = curTime[i];
            }

        }
        renderBalls();
        drop();
    }


    function renderDigit(offset, num) {

        for (var i = 0; i < 10; i++)
            for (var j = 0; j < 7; j++) {
                if (digit[num][i][j] == 1) {
                    context.fillStyle = '#06c';
                    context.beginPath();
                    context.arc(offset + (2 * j + 1) * (R + 1), TOP + (2 * i + 1) * (R + 1), R, 0, Math.PI * 2);
                    context.closePath();
                    context.fill();
                }
            }
    }

    function addBalls(offset, num) {
        for (var i = 0; i < 10; i++)
            for (var j = 0; j < 7; j++) {
                if (digit[num][i][j] == 1) {
                    var ball = {
                        x: offset + (2 * j + 1) * (R + 1),
                        y: TOP + (2 * i + 1) * (R + 1),
                        vx: Math.pow(-1, Math.floor(Math.random() * 2)) * 10,
                        vy: Math.pow(-1, Math.floor(Math.random() * 2)) * 3,
                        g: 5.5 + Math.random() * 5,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    }
                    balls.push(ball);
                }
            }
    }

    function drop() {

        var count = 0;

        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx * interval / 70;
            balls[i].y += balls[i].vy * interval / 70;
            balls[i].vy += balls[i].g * interval / 70;

            if (balls[i].y >= canvas.height - R) {
                balls[i].y = canvas.height - R;
                balls[i].vy = -balls[i].vy * 0.75;
            }
            if (balls[i].x - R > 0 && balls[i].x + R < canvas_width) {
                balls[count++] = balls[i];
            }
        }
        while (balls.length > count) {
            balls.pop();
        }
    }

    function renderBalls() {
        for (var i = 0; i < balls.length; i++) {
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
    }

    function calTime() {

        var curTime = new Date();
        var numList = [];

        var timeLEFT = Math.round((endTime.getTime() - curTime.getTime()) / 1000);

        var hours = Math.floor(timeLEFT / 3600);
        var minutes = Math.floor((timeLEFT - hours * 3600) / 60);
        var seconds = timeLEFT % 60;

        numList[0] = Math.floor(hours / 10);
        numList[1] = hours % 10;
        numList[2] = 10;
        numList[3] = Math.floor(minutes / 10);
        numList[4] = minutes % 10;
        numList[5] = 10;
        numList[6] = Math.floor(seconds / 10);
        numList[7] = seconds % 10;

        return numList;
    }

}


end = new Date().getTime();

console.log(end - start);
