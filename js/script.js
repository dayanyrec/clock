window.onload = function () {
	var draw = document.getElementById('draw');

	if (draw.getContext) {

		var ctx = draw.getContext('2d');

		draw.width = document.body.clientWidth;

		draw.height = document.body.clientHeight;

	}

}
