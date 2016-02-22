 function getMousePos(canvas, evt) {
 	var rect = canvas.getBoundingClientRect();
 	return {
 		x: evt.clientX - rect.left,
 		y: evt.clientY - rect.top
 	};
 }

 function getspace(evt) {

 	var cord = getMousePos(canvas, evt);
 	var q;
 	var i;
 	var j;
 	for (q = 0; q < cordlist.x.length / 2; q++) {
 		i = q * 2;
 		j = i + 1
 		if (cordlist.x[i] < cord.x && cord.x < cordlist.x[j] && cordlist.y[i] < cord.y && cord.y < cordlist.y[j]) {
 			return q;
 		}

 	}
 }

 function clear() {
 	context.clearRect(0, 0, canvas.width, canvas.height);
 }

 function drawo(x, y, r) {
 	context.beginPath();
 	context.arc(x, y, r, 0, 2 * Math.PI);
 	context.stroke();
 }

 function drawx(x, y, r) {
 	context.beginPath();
 	context.moveTo(x - r, y - r);
 	context.lineTo(x + r, y + r);
 	context.moveTo(x + r, y - r);
 	context.lineTo(x - r, y + r);
 	context.stroke();

 }

 function drawboard() {
 	var i;
 	var j;
 	var x;
 	var y;
 	var r;
 	var calc;
 	var q;
 	if (turn % 2 == 0) {
 		document.getElementById("turn").innerHTML = "It's Player 1's Turn!"
 	}
 	if (turn % 2 == 1) {
 		document.getElementById("turn").innerHTML = "It's Player 2's Turn!"
 	}

 	for (q = 0; q < 60; q++) {

 		i = q * 2;
 		j = i + 1;
 		calc = cordlist.x[j] - cordlist.x[i];
 		calc = calc / 2;
 		calc = calc + cordlist.x[i];
 		x = calc;
 		calc = cordlist.y[j] - cordlist.y[i];
 		calc = calc / 2;
 		calc = calc + cordlist.y[i];
 		y = calc;
 		if (cordlist.x[j] - cordlist.x[i] < cordlist.y[j] - cordlist.y[i]) {
 			calc = cordlist.x[j] - cordlist.x[i];
 			calc = calc * .25;
 			r = calc;
 		} else {

 			calc = cordlist.y[j] - cordlist.y[i];
 			calc = calc * .25;
 			r = calc;
 		}
 		if (grid[q] == 1) {
 			context.strokeStyle = '#000';
 			drawx(x, y, r)
 		}
 		if (grid[q] == 2) {
 			context.strokeStyle = '#000';

 			drawo(x, y, r)
 		}

 	}
 	i = cursor * 2;
 	j = i + 1;
 	calc = cordlist.x[j] - cordlist.x[i];
 	calc = calc / 2;
 	calc = calc + cordlist.x[i];
 	x = calc;
 	calc = cordlist.y[j] - cordlist.y[i];
 	calc = calc / 2;
 	calc = calc + cordlist.y[i];
 	y = calc;
 	if (cordlist.x[j] - cordlist.x[i] < cordlist.y[j] - cordlist.y[i]) {
 		calc = cordlist.x[j] - cordlist.x[i];
 		calc = calc * .25;
 		r = calc;
 	} else {

 		calc = cordlist.y[j] - cordlist.y[i];
 		calc = calc * .25;
 		r = calc;
 	}

 	context.strokeStyle = '#FF5000';
 	if (turn % 2 == 0) {

 		drawx(x, y, r)

 	}
 	if (turn % 2 == 1) {

 		drawo(x, y, r)
 	}

 }

 function newgame() {
 	grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
 	moves = [];
 	turn = 0;
 	clear()
	cursor = undefined;
	drawboard();
 }

 function click() {
 	if (grid[cursor] == 0 && grid[underneath[cursor]] != 0) {
 		if (turn % 2 == 0) {
 			grid[cursor] = 1
 		}
 		if (turn % 2 == 1) {
 			grid[cursor] = 2
 		}
 		moves.push(cursor);
		
 		turn += 1;
		//checkforawinner(cursor);
		cursor = undefined;
		
 	}

 	clear();
	
 	drawboard();
 }

 function mousemove(evt) {
 	if (getspace(evt) != undefined) {
 		cursor = checkunder(getspace(evt))
 	}
	 
 	clear();
 	drawboard();
 }

 function checkunder(box) {
 	if (grid[box] == 0 && grid[underneath[box]] != 0) {
 		return box;
 	} else {
 		return checkunder(underneath[box]);
 	}
 }

 function takebackmove() {
 	if (turn > 0) {
 		grid[moves[moves.length - 1]] = 0;
 		moves.pop();
 		turn -= 1;
 		clear();
 		drawboard();
 	}
 }
	function checkclock(start){
		if (grid[clock[start]] == grid[start]){
			counter += 1;
			return checkclock(clock[start])
		}
		else{
			return counter;
			counter = 0
		}
	}
	function checkcounterclock(start){
		if (grid[counterclock[start]] == grid[start]){
			counter += 1;
			return checkcounterclock(counterclock[start])
		}
		else{
			return counter;
			counter = 0
		}
	}
function checkforawinner(box){	
	if(grid[box] == grid[underneath[box]] && grid[box] == grid[underneath[underneath[box]]] && grid[box] == grid[underneath[underneath[underneath[box]]]] && underneath[underneath[underneath[box]]] != 60){
		return grid[box];
	}
	else{
counter = 0;
var g = checkcounterclock(box);
counter = 0;
var h = checkclock(box);
		console.log(g+h)
}
	
	
		
	}


	
 var cordlist = {
 	x: [213, 238, 238, 263, 238, 263, 213, 238, 172, 203, 195, 238, 238, 283, 273, 304, 273, 304, 238, 283, 195, 238, 172, 203, 126, 160, 142, 170, 171, 203, 204, 238, 238, 272, 273, 305, 306, 334, 316, 350, 316, 350, 306, 334, 273, 305, 238, 272, 204, 238, 171, 203, 142, 170, 126, 160, 96, 123, 116, 140, 150, 185, 197, 238, 238, 272, 291, 326, 336, 360, 353, 380, 353, 380, 336, 360, 291, 326, 238, 272, 197, 238, 150, 185, 126, 140, 96, 123, 68, 95, 88, 123, 128, 179, 181, 238, 238, 295, 297, 348, 353, 388, 381, 408, 381, 408, 353, 388, 297, 348, 238, 295, 181, 238, 128, 179, 88, 123, 68, 95],

 	y: [176.5, 201.5, 176.5, 201.5, 151.5, 176.5, 151.5, 176.5, 176.5, 217.5, 210.5, 256.5, 210.5, 256.5, 176.5, 217.5, 135.5, 176.5, 96.5, 142.5, 96.5, 142.5, 135.5, 176.5, 176.5, 207.5, 211.5, 250.5, 248.5, 276.5, 257.5, 293.5, 257.5, 293.5, 248.5, 276.5, 211.5, 250.5, 176.5, 207.5, 145.5, 176.5, 102.5, 141.5, 76.5, 104.5, 59.5, 95.5, 59.5, 95.5, 76.5, 104.5, 102.5, 141.5, 145.5, 176.5, 176.5, 223.5, 236.5, 267.5, 278.5, 304.5, 295.5, 319.5, 294.5, 319.5, 278.5, 304.5, 236.5, 267.5, 176.5, 223.5, 129.5, 176.5, 85.5, 116.5, 48.5, 74.5, 33.5, 58.5, 33.5, 57.5, 48.5, 74.5, 85.5, 116.5, 129.5, 176.5, 176.5, 236.5, 249.5, 292.5, 301.5, 331.5, 320.5, 351.5, 320.5, 351.5, 301.5, 331.5, 249.5, 292.5, 176.5, 236.5, 116.5, 176.5, 60.5, 103.5, 21.5, 51.5, 1.5, 32.5, 1.5, 32.5, 21.5, 51.5, 60.5, 103.5, 116.5, 176.5]
 };
 var underneath = [60, 60, 60, 60, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
var counterclock = [1, 2, 3, 0, 5, 6, 7, 8, 9, 10, 11, 4, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 12, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 28, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 44];
var clock = [3, 0, 1, 2];
 var grid;
 var cursor;
 var canvas = document.getElementById('myCanvas');
 var context = canvas.getContext('2d');
 var turn;
 var moves;
	var counter = 0;
newgame();

 canvas.addEventListener('mousemove', mousemove, false);
 canvas.addEventListener('click', click, false);