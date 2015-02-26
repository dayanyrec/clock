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
	var r = 0.7 * y;

	ctx.beginPath();
	// draw outer circle
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);

	// draw inner circle
	ctx.moveTo(x + r - 5, y);
	ctx.arc(x, y, r - 5, 0, 2 * Math.PI, false);

	// draw minute hand
	ctx.moveTo(x, y);
	ctx.lineTo(x, y - r + 15);

	// draw hour hand
	ctx.moveTo(x, y);
	ctx.lineTo(x - r + 35, y);

	// stroke the path
	ctx.stroke();
}
