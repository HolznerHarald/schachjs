function init() {

} 
function f1(x,y) {
	document.getElementById("p1").innerHTML = x + " " + y;
	z = 8 * y + x;
	document.getElementById("ID"+z).style.backgroundColor = "#000000";
}



/*function doSomething(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	document.getElementById("p1").innerHTML = posx;
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
}*/