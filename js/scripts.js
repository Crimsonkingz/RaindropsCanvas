'use strict'

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById("rainCanvas");

var ctx = canvas.getContext("2d");

var particles = [];

var init = function() {
	registerEvents();
	setCanvasSize();

	createParticles(40);

	render();

};

var registerEvents = function() {
	window.addEventListener("resize", function() {
		resize();
	});
};

var resize = function() {
	setCanvasSize();
};

var setCanvasSize = function() {
	width = window.innerWidth;
	height = window.innerHeight;

	ctx.canvas.width = width;
	ctx.canvas.height = height;
};



// 0 radians is 3 oclock position
// Converts angle into radians
var drawCircle = function(x,y,radius){
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);

	// ctx.strokeStyle = "black";
	// ctx.stroke();
	ctx.shadowBlur=20;
	ctx.shadowColor="white";
	ctx.fillStyle = "white";
	ctx.fill();

};



var render = function() {
	ctx.clearRect(0,0,width,height);
	requestAnimationFrame(render); 

  //   var now = new Date().getTime(),
  //    dt = now - (time || now);
 	// var time = now;
    
    
 	for (var i = 0; i < particles.length; i++) {
 		
 		if (particles[i].position.y >= height + particles[i].radius) {
 			 particles[i].position.y = 0 - particles[i].radius;
 		}
 			drawCircle(particles[i].position.x += particles[i].speed.x , 
 				   particles[i].position.y += particles[i].speed.y, 
 				   particles[i].radius);
 	}
    
  

};

var Particle = function() {
	this.radius = 5;
	this.position = {x: 0, y: 0};
	this.speed = {x: 0, y: 0};

}

var createParticles = function(numParticles) {
	
	for (var i = 0; i < numParticles; i++) {
		var p = new Particle();
		p.radius = (Math.random() * 9) + 1;
		p.position.x = Math.random() * width;
		p.position.y = -1 * Math.random()*height;
		p.speed.y = 2 + (5 * Math.random());

		particles.push(p);
	}
};
init();
