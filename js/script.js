window.onload = function () {
	var draw = document.getElementById('draw'),
		ctx;

	ctx = getCtx(draw);
	if (ctx === null) return;

	setSize(draw);

	drawClock(ctx, draw.width / 2, draw.height / 2);
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
		numbersAngle = 2 * Math.PI / 12;

	ctx.beginPath();
	// draw outer circle
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);

	// draw inner circle
	ctx.moveTo(x + r - 5, y);
	ctx.arc(x, y, r - 5, 0, 2 * Math.PI, false);

	// translate to center
	ctx.translate(x, y);

	// draw minute hand
	ctx.moveTo(0, 0);
	ctx.lineTo(0, - r + 15);

	// draw hour hand
	ctx.moveTo(0, 0);
	ctx.lineTo(- r + 45, 0);

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
}
