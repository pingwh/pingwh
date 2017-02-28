var JSON = {};

function loadImage(arr, fnSucc) {
	var count = 0;
	for(var i = 0; i < arr.length; i++) {
		var oImg = new Image();
		(function(index) {
			oImg.onload = function() {
				JSON[arr[index]] = this;
				count++;
				if(count == arr.length) {
					fnSucc && fnSucc();
				}
			};
		})(i);
		oImg.src = '../img/' + arr[i] + '.png';
	}
}