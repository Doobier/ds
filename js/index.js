var oUl = document.querySelector("#oul");
var oBox = document.querySelector("#box");
var oDot = document.querySelector("#dot");
var aA = oDot.getElementsByTagName("a");
var aImg = oUl.getElementsByTagName('img');
var oImg = oUl.getElementsByTagName('img')[0];
var timer = null;
var n = 0;
var aLi = oUl.getElementsByTagName('li');

var imgWidth = oImg.offsetWidth;

var cloneLi = aLi[0].cloneNode( true );
oUl.appendChild( cloneLi );
oUl.style.width = imgWidth * aImg.length +"px";


for ( var i = 0; i < aA.length; i++ ){
	aA[i].index = i;
	aA[i].onclick = function(){
		for( var i = 0; i < aA.length; i++ ){
			aA[i].className = '';
		}
		n = this.index;
		auto(n);
	}
}



function auto(n){
	for(var i = 0; i < aA.length; i++){
		aA[i].className = '';
	}
	console.log(n)
	aA[n % aA.length].className = 'active';
	startMove( oUl, { left:-imgWidth * n },{ complete:function(){
		if( n == 2 ){
			oUl.style.left = 0;
		}
		
	} })
}
function play(){
	clearInterval(timer);
	timer = setInterval(function(){
		n++;
		auto(n)
		if( n == 2 ){
			n = 0;
		}
		
	},3000)
}

play();


oBox.onmouseover = function(){
	clearInterval( timer );
}

oBox.onmouseout = function(){
	play();
}















