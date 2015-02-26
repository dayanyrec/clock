window.onload = function () {
	var draw = document.getElementById('draw'),
		ctx;

	ctx = getCtx(draw);

	setSize(draw);
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
