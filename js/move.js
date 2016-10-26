function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

/*function move(obj, json, fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;

		for(var attr in json){
			var iCur = 0;
			if( attr == 'opacity' ){
				iCur = Math.round(parseFloat( getStyle(obj, attr) ) * 100);

			}else{
				iCur = parseInt( getStyle(obj, attr) );
			}

			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );

			if( iCur != json[attr] ){
				flag = false;
			} 

			if( attr == 'opacity' ){
				obj.style.filter = 'alpha(opacity:' + (iCur + speed) + ')';
                obj.style.opacity = (iCur + speed)/100;
			}else{
				obj.style[attr] = iCur + speed +'px';
			}
		}

		if( flag ){
			clearInterval( obj.timer );
                if( fn ){
                    fn();
                }
		}
	},30)
}*/

function startMove(obj, json, options){
	options = options || {};
	options.duration = options.duration || 800;
	options.easing = options.easing || 'ease-out';

	var start = {};
	var dis = {};

	for( var name in json ){
		start[name] = parseInt( getStyle(obj, name) );
		if(isNaN(start[name])){
            switch(name){
                case 'width':
                    start[name]=obj.offsetWidth;    
                    break;
                case 'height':
                    start[name]=obj.offsetHeight;   
                    break;
                case 'opacity':
                    start[name]=1;  
                    break;
                case 'left':
                    start[name]=0;  
                    break;
                case 'top':
                    start[name]=0;  
                    break;
                //marginLeft/top... padding
            }   
        }

        dis[name] = json[name] - start[name];
	}

	var count = Math.floor(options.duration / 16);
	var n = 0;
	clearInterval( obj.timer );
	obj.timer = setInterval(function(){
		n++;

		for(var name in json){
			switch(options.easing){
				case "linear":
					var a = n / count;
					var cur = start[name] + a * dis[name];
					break;
				case "ease-in":
					var a = n / count;
					var cur = start[name] + a * a * a * dis[name];
					break;
				case "ease-out":
				 	var a = 1 - n / count;
				 	var cur = start[name] + (1 - a *a *a )*dis[name];
				 	break;		
			}
			if(name == "opacity"){
				obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			}else{
				obj.style[name] = cur + "px";
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete&&options.complete();   
		}
	},16)
}