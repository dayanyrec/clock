window.onload = function () {
	var draw = document.getElementById('draw'),
		ctx,
		xClock,
		yClock,
		rClock;

	ctx = getCtx(draw);
	if (ctx === null) return;

	setSize(draw);

	xClock = draw.width / 2;
	yClock = draw.height / 2;
	rClock = xClock < yClock ? 0.7 * xClock : 0.7 * yClock;

	drawClock(ctx, xClock, yClock, rClock);

	setInterval(function () {
		ctx.clearRect(0, 0, draw.width, draw.height);
		drawClock(ctx, xClock, yClock, rClock);
	}, 1000);

};

function getCtx (canvas) {
	if (!canvas.getContext) {
		console.error('Your browser does not support the HTML5 <canvas>.');
		return null;
	}

	return canvas.getContext('2d');
}

function setSize (canvas) {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}

function drawClock (ctx, x, y, r) {
	var numbersAngle = 2 * Math.PI / 12,
		hourAngle = numbersAngle,
		minAngle = 2 * Math.PI / 60,
		date = new Date();

	document.body.style.backgroundColor = '#' + date.getHours() + date.getMinutes() + date.getSeconds();

	ctx.beginPath();
	// draw outer circle
	ctx.save();
	ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
	ctx.lineWidth = 5;
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	ctx.beginPath();

	ctx.save();

	// translate to center
	ctx.translate(x, y);

	// draw seconds hand
	ctx.save();
	ctx.rotate(minAngle * date.getSeconds());
	ctx.moveTo(-2, 20);
	ctx.lineTo(0, - r + 30);
	ctx.lineTo(2, 20);
	ctx.restore();

	// draw minute hand
	ctx.save();
	ctx.rotate(minAngle * date.getMinutes());
	ctx.moveTo(-4, 20);
	ctx.lineTo(0, - r + 30);
	ctx.lineTo(4, 20);
	ctx.restore();

	// draw hour hand
	ctx.save();
	ctx.rotate(hourAngle * date.getHours());
	ctx.moveTo(-4, 20);
	ctx.lineTo(0, - r + 100);
	ctx.lineTo(4, 20);
	ctx.restore();

	// fill the path
	ctx.fill();

	// draw numbers
	ctx.font = 'bold 14px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.save();
	ctx.rotate(numbersAngle);
	for (i = 1; i <= 12; i++) {
		ctx.fillText(i, 0, - r + 20);
		ctx.rotate(numbersAngle);
	}
	ctx.restore();

	ctx.restore();
}
