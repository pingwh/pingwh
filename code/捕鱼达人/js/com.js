var JSON={};//{'fish1':oImg1,'fish2':oImg2,'fish3':oImg3}
function loadImage(arr,fnSucc){
	var count=0;
	for(var i=0; i<arr.length; i++){
		var oImg=new Image();
			//循环里面加事件，事件里的i不能用
		(function(index){
			oImg.onload=function(){
			//当前这个oImg;
			JSON[arr[index]] = this;
			count++;
			if(count==arr.length){
				fnSucc&&fnSucc();
			}
		};
		})(i);
		oImg.src='img/'+arr[i]+'.png';
	}
}
function d2a(n){
	return Math.PI*n/180;
}
function a2d(n){
	return n*180/Math.PI;
}
function rnd(m,n){
	return parseInt(Math.random()*(n-m)+m);
}


