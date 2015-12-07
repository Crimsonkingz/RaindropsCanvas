'use strict'
var container = document.getElementById("container")
var width = container.offsetWidth;
var height = container.offsetHeight;
var canvas = document.getElementById("rainCanvas");
var ctx = canvas.getContext("2d");

var particles = [];
var splashes = [];

var init = function() {
	registerEvents();
	setCanvasSize();
	
	// # particles, radius, speed, wind
	createParticles(200, 5, 10, 3);
	
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
	width = container.offsetWidth;
	height = container.offsetHeight;

	ctx.canvas.width = width;
	ctx.canvas.height = height;
};



// 0 radians is 3 oclock position

var drawRainDrop = function(x,y,radius, alpha){
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI);	
	
	ctx.fillStyle = "rgba(0,102,255," + alpha +")";
	ctx.moveTo((x-radius), y)
	ctx.lineTo(x,y-2*radius);
	ctx.lineTo((x+radius),y);
	// ctx.closePath();
	ctx.fill();	

};

var drawSplash = function(x, y, endRadius) {
	ctx.beginPath();
	ctx.arc(x, y, endRadius, 0, 2*Math.PI);
	ctx.fill();
};


var render = function() {
	ctx.clearRect(0,0,width,height);
	
	requestAnimationFrame(render); 
	

   
 	for (var i = 0; i < particles.length; i++) {
 		
 		drawRainDrop(particles[i].position.x += particles[i].speed.x , 
			   	   particles[i].position.y += particles[i].speed.y, 
 				   particles[i].radius, particles[i].alpha);
		if (particles[i].position.y >= height - (2*particles[i].radius)) {

			drawSplash(particles[i].position.x, height - (2*particles[i].radius), splashes[i].endRadius);

 		
 		}
		if (particles[i].position.y >= height - particles[i].radius) {

 			 particles[i].position.y = 0 - particles[i].radius;
 		
 		}
 		if (particles[i].position.x >= width + particles[i].radius) {

 			 particles[i].position.x = 0 - particles[i].radius;
 			 
 		}	
		
 	}
    
  

};

var Particle = function() {
	this.radius = 5;
	this.position = {x: 0, y: 0};
	this.speed = {x: 0, y: 0};

};

var Splash = function() {	
	
	this.endRadius = 20;


};
var createParticles = function(numParticles, radius, speed, wind) {
	
	for (var i = 0; i < numParticles; i++) {
		var p = new Particle();
		p.radius = (Math.random() * radius) + 1;
		p.position.x = Math.random() * width;
		p.position.y = -1 * Math.random()*height;
		p.speed.y = 5 + (speed * Math.random());
		p.speed.x = (0.5 * wind) - (wind * Math.random());
		p.alpha = Math.random();
		particles.push(p);

		var s = new Splash();
		s.endRadius = p.radius+(p.speed.y/2);		
		splashes.push(s);

	}
};
init();
