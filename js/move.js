(function(document,window){
	var pfx = (function(){
		var style = document.createElement('dummy').style,
			// 前缀-兼容
			prefixes = 'Webkit Moz O ms Khtml'.split(' '),
			//存储
			memory = {};
		return function(prop){
			if(typeof memory[prop] === "undefined"){
				var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
					props = (prop +' '+ prefixes.join(ucProp + ' ')+ ucProp).split(' ');
				memory[prop] = null;
				for(var i in props){
					if(style[props[i]] !== undefined){
						memory[prop] = props[i];
						break;
					}
				}
			}
			return memory[prop];
		}
	})();
	
	var arrayify = function(a){
		return [].slice.call(a);
	}
	
	var css = function(el,props){
		var key, pkey;
		for(key in props){
			if(props.hasOwnProperty(key)){
				pkey = pfx(key);
				if(pkey != null){
					el.style[pkey] = props[key];
				}
			}
		}
		return el;
	}
	
	var $ = function(selector,context){
		context = context || document;
		return context.querySelector(selector);
	};
	
	var $$ = function(selector,context){
		context = context || document;
		return arrayify(context.querySelectorAll(selector));
	}
	
	var translate = function(t) {
		return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
	};
	
	var rotate = function(r,revert){
		var rX = "rotateX("+r.x+"deg)",
			rY = "rotateY("+r.y+"deg)",
			rZ = "rotateZ("+r.z+"deg)";
		return revert ? rZ + rY +rX : rX + rY + rZ;
	};
	
	var scale = function(s){
		return "scaleX(" + s.x + ") scaleY(" + s.y +") scaleZ(" + s.z + ")";
	}
	
	//检查
	var ua = navigator.userAgent.toLowerCase();
	var mainSupported = (pfx("perspective") != null) && (ua.search(/(iphone)|(ipod)|(ipad)|(android)/) == -1);
	
	//DOM ELEMENTS
	var main = document.getElementById("main");
	if(!mainSupported){
		main.className = "main";
		return;
	}else{
		main.className = "";
	}
	
	//画布
	var canvas = document.createElement("div");
	canvas.className = "canvas";
	
	arrayify(main.childNodes).forEach(function(el){
		canvas.appendChild(el);
	});
	main.appendChild(canvas);
	
	var steps = $$(".step", main);
	
	//设置初始值和默认值
	document.documentElement.style.height = "100%";
	css(document.body,{
		height: "100%",
		overflow: "hidden"
	});
	
	var props = {
		position: "absolute",
		transformOrigin: "top left",
		transition: "all 1s ease-in-out",
		transformStyle: "preserve-3d"
	};
	
	css(main, props);
	css(main,{
		top: "50%",
		left: "50%",
		perspective: "1000px"
	});
	css(canvas, props);
	var current = {
		translate: {
			x: 0,
			y: 0,
			z: 0
		},
		rotate: {
			x: 0,
			y: 0,
			z: 0
		},
		scale: {
			x: 1,
			y: 1,
			z: 1
		}
	};
	
	steps.forEach(function(el,idx){
		var data = el.dataset,
			step = {
				translate:{
					x:data.x || 0,
					y:data.y || 0,
					z:data.z || 0
				},
				rotate: {
					x: data.rotateX || 0,
					y: data.rotateY || 0,
					z: data.rotateZ || data.rotate || 0
				},
				scale: {
					x:data.scaleX || data.scale || 1,
					y:data.scaleY || data.scale || 1,
					z:data.scaleZ || 1
				}
			};
		el.stepData = step;
		if(!el.id){
			el.id = "step-" + idx;
		}
		css(el,{
			position:"absolute",
			transform:"translate(-50%,-50%)" +
				translate(step.translate)+
				rotate(step.rotate) +
				scale(step.scale),
			transformStyle:"preserve-3d"
		});
	});
	
	//步骤 active
	var select = function(el){
		var step = el.stepData;
		if($(".step.active",main)){
			$(".step.active",main).classList.remove("active");
		}
		el.classList.add("active");
		main.className = "step-" + el.id;
		
		var target = {
			rotate: {
				x: -parseInt(step.rotate.x, 10),
				y: -parseInt(step.rotate.y, 10),
				z: -parseInt(step.rotate.z, 10),
			},
			scale: {
				x: 1 / parseFloat(step.scale.x),
				y: 1 / parseFloat(step.scale.y),
				z: 1 / parseFloat(step.scale.z),
			},
			translate: {
				x: -step.translate.x,
				y: -step.translate.y,
				z: -step.translate.z
			}
		};
		var zoomin = target.scale.x >= current.scale.x;
		
		css(main,{
			transform:scale(target.scale),
			transitionDelay:(zoomin ? "500ms" : "0ms")
		});
		css(canvas, {
			transform: rotate(target.rotate, true) + translate(target.translate),
			transitionDelay: (zoomin ? "0ms" : "500ms")
		});
		current = target;
	}
	//键盘事件
	document.addEventListener('keydown',function(event){
		if(event.keyCode == 9 || event.keyCode == 32 || (event.keyCode >= 37 && event.keyCode <= 40)) {
			var active = $(".step.active", main);
			var next = active;
			switch(event.keyCode) {
				case 37:
					; // left
				case 38: // up
					next = steps.indexOf(active) - 1;
					next = next >= 0 ? steps[next] : steps[steps.length - 1];
					break;
				case 9:
					; // tab
				case 32:
					; // space
				case 39:
					; // right
				case 40: // down
					next = steps.indexOf(active) + 1;
					next = next < steps.length ? steps[next] : steps[0];
					break;
			}

			select(next);

			event.preventDefault();
		}
	},false);
	window.addEventListener("scroll",function(event){
		window.scrollTo(0,0);
	},false);
	select(steps[0]);
})(document,window);
