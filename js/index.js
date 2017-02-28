document.addEventListener('DOMContentLoaded',function(){
	var oBg1 = document.querySelector('#bg1');
	var oBg2 = document.querySelector('#bg2');
	var oMenu = document.querySelector('.menu');
	var oButton = document.querySelector('.button');
	var aMenu = document.querySelectorAll('.menu li');
	oMenu.addEventListener('click',function(){
		if(oBg1.style.display == 'block'){
			oBg1.style.display = 'none';
			oBg1.style.transition = '2s all ease';
			oBg2.style.display = 'block';
			oBg2.style.opacity = 1;
			oBg2.style.transition = '2s all ease';
			aMenu[0].style.transform = 'rotate(37deg)';
			aMenu[0].style.transformOrigin = 'left center';
			aMenu[2].style.transform = 'rotate(-37deg) ';
			aMenu[2].style.transformOrigin = 'left center';
			aMenu[1].style.transform = 'translateX(-40px)';
		}else{
			oBg1.style.display = 'block';
			oBg2.style.display = 'none';
			oBg2.style.opacity = 0;
			aMenu[0].style.transform = 'rotate(0deg)';
			aMenu[2].style.transform = 'rotate(0deg)';
			aMenu[1].style.transform = 'translateX(0px)';
		}
	},false);
	oButton.addEventListener('click',function(){
		if(oBg1.style.display == 'block'){
			oBg1.style.display = 'none';
			oBg2.style.display = 'block';
			oBg2.style.opacity = 1;
			aMenu[0].style.transform = 'rotate(37deg)';
			aMenu[0].style.transformOrigin = 'left center';
			aMenu[2].style.transform = 'rotate(-37deg) ';
			aMenu[2].style.transformOrigin = 'left center';
			aMenu[1].style.transform = 'translateX(-40px)';
		}else{
			oBg1.style.display = 'block';
			oBg2.style.display = 'none';
			oBg2.style.opacity = 0;
			aMenu[0].style.transform = 'rotate(0deg)';
			aMenu[2].style.transform = 'rotate(0deg)';
			aMenu[1].style.transform = 'translateX(0px)';
		}
	},false);
	//

},false);
$(function(){
	 $('.m-nav li').on('mouseenter',function(){
	 	$(this).children('a').children('div').stop().animate({top:'60%',width:50,opacity:1});
	 	$(this).children('a').children('ul').children('li').stop().animate({top:-50});
	 	$(this).children('a').children('em').stop().animate({opacity:0.1});
	 })	
	 $('.m-nav li').on('mouseleave',function(){
	 	$(this).children('a').children('div').stop().animate({top:'75%',width:20,opacity:0});
	 	$(this).children('a').children('ul').children('li').stop().animate({top:0});
	 	$(this).children('a').children('em').stop().animate({opacity:0.5});
	 })	
});
