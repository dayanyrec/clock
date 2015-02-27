window.onload = function () {
	var draw = document.getElementById('draw'),
		ctx;

	ctx = getCtx(draw);
	if (ctx === null) return;

	setSize(draw);

	drawClock(ctx, draw.width / 2, draw.height / 2);

	setInterval(function () {
		ctx.clearRect(0, 0, draw.width, draw.height);
		drawClock(ctx, draw.width / 2, draw.height / 2);
	}, 1000);

}

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

function drawClock (ctx, x, y) {
	var r = 0.7 * y,
		numbersAngle = 2 * Math.PI / 12,
		hourAngle = numbersAngle,
		minAngle = 2 * Math.PI / 60,
		date = new Date();

	ctx.beginPath();
	// draw outer circle
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);

	// draw inner circle
	ctx.moveTo(x + r - 5, y);
	ctx.arc(x, y, r - 5, 0, 2 * Math.PI, false);

	ctx.save();

	// translate to center
	ctx.translate(x, y);

	// draw seconds hand
	ctx.save();
	ctx.rotate(minAngle * date.getSeconds());
	ctx.moveTo(0, 0);
	ctx.lineTo(0, - r + 15);
	ctx.restore();

	// draw minute hand
	ctx.save();
	ctx.rotate(minAngle * date.getMinutes());
	ctx.moveTo(0, 0);
	ctx.lineTo(0, - r + 15);
	ctx.restore();

	// draw hour hand
	ctx.save();
	ctx.rotate(hourAngle * date.getHours());
	ctx.moveTo(0, 0);
	ctx.lineTo(0, - r + 65);
	ctx.restore();

	// stroke the path
	ctx.stroke();

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
