/* eslint-disable */
var Fireworks = function(){
	/*=============================================================================*/	
	/* Utility  随机， request兼容， 碰撞检测
	/*=============================================================================*/
	var self = this;
	var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
	var hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
	window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
	
	/*=============================================================================*/	
	/* Initialize
	/*=============================================================================*/
	let option = {
		canvasWidth: window.innerWidth,
		canvasHeight: window.innerHeight * 0.45,
	}
	self.init = function(){
    self.dt = 0;																																 // 时间间隔？
		self.oldTime = Date.now();                                                   // 保存当前时间
		self.canvas = document.createElement('canvas');				
		self.context = self.canvas.getContext('2d');				
		// self.canvasContainer = $('#canvas-container');
		self.canvasContainer = document.getElementById('canvas-container');          // 预先设置画布
		
		var canvasContainerDisabled = document.getElementById('canvas-container');   // todo
		// self.canvas.onselectstart = function() {                                  // 禁止选择 todo 删掉
		// 	return false;
		// };
		
		self.canvas.width = self.cw = option.canvasWidth;														 // todo: 不要写死
		self.canvas.height = self.ch = option.canvasHeight;
		if (window.devicePixelRatio) {
      self.canvas.style.width = self.canvas.width + 'px'
      self.canvas.style.height = self.canvas.height + 'px'
      self.canvas.height = self.canvas.height * window.devicePixelRatio
      self.canvas.width = self.canvas.width * window.devicePixelRatio
      self.context.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
		
		
		self.particles = [];	                     // 粒子
		self.fireworks = [];	                     // 烟花
		self.mx = self.cw/2;                       // todo
		self.my = self.ch/2;
		self.currentHue = 44;                     // todo: 山？ 可以去掉

		self.partCount = 199;                       // 烟花粒子数	
		self.partSpeed = 1;                        // 烟花散开粒子速度
		self.partSpeedVariance = 10;               // 烟花速度方差， 决定散开范围
		self.partWind = 0;                        // 散开末端的曲折
		self.partFriction = 17;                     // 摩擦力，表现：烟花远近（越小越近图越大）
		self.partGravity = 0;                      // 烟花粒子所受重力
		self.hueMin = 44;												 // todo   色值最小？
		self.hueMax = 48;                         // todo 	色值最大？
		self.hueVariance = 10;                     // todo 色值范围差
		self.fworkSpeed = 2;                       // 烟花上升速度
		self.fworkAccel = 4;                       // 轨迹长度

		self.flickerDensity = 23;                  // 闪烁密度   结束后一闪一闪的
		self.showShockwave = false;                // todo 鼠标点击相关
		self.showTarget = false;                    // todo 鼠标样式  删了

		self.clearAlpha = 25;                      // 清晰度

		self.canvasContainer && self.canvasContainer.appendChild(self.canvas);  // 添加画布
		self.ctx = self.canvas.getContext('2d');
		self.ctx.lineCap = 'round';
		self.ctx.lineJoin = 'round';
		self.lineWidth = 1;                             // 烟花线粒度
		// self.bindEvents();			
		self.canvasLoop();
  
	};		
	
	/*=============================================================================*/	
	/* Particle Constructor  火花构造器
	/*=============================================================================*/
	var Particle = function(x, y, hue){
		this.x = x;
		this.y = y;
		this.coordLast = [
			{x: x, y: y},
			{x: x, y: y},
			{x: x, y: y}
		];
		// 角度360度
		this.angle = rand(0, 360);
		this.speed = rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance));
		this.friction = 1 - self.partFriction/100;                      // 摩擦力
		this.gravity = self.partGravity/2;                              // g/2
		this.hue = rand(hue-self.hueVariance, hue+self.hueVariance);    // 色值
		this.brightness = rand(50, 80);
		this.alpha = rand(40,100)/100;                                  // 透明度
		this.decay = rand(10, 50)/1000;																	// 衰变
		this.wind = (rand(0, self.partWind) - (self.partWind/2))/25;    // todo：什么公式？
		this.lineWidth = self.lineWidth;
	};
	
	Particle.prototype.update = function(index){
		var radians = this.angle * Math.PI / 180;                     // 弧度
		var vx = Math.cos(radians) * this.speed;										  // 横速度
		var vy = Math.sin(radians) * this.speed + this.gravity;       // 纵速度
		this.speed *= this.friction;                                  // 乘摩擦因子
						
		// this.coordLast[2].x = this.coordLast[1].x;                    // 三个点保存轨迹
		// this.coordLast[2].y = this.coordLast[1].y;
		// this.coordLast[1].x = this.coordLast[0].x;
		// this.coordLast[1].y = this.coordLast[0].y;
		this.coordLast[0].x = this.x;
		this.coordLast[0].y = this.y;
		
		this.x += vx * self.dt;                                      // 当前坐标
		this.y += vy * self.dt;
		
		this.angle += this.wind;				
		this.alpha -= this.decay;                                   // 透明度
		
		// 碰撞检测和消失时候删掉 
		if(!hitTest(0,0,self.cw,self.ch,this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2) || this.alpha < .05){					
			self.particles.splice(index, 1);	
		}			
	};
	
	Particle.prototype.draw = function(){
		// var coordRand = (rand(1,3)-1);                           // coordRand 代表什么？ 0 -2 取整
		var coordRand = 0                           // coordRand 代表什么？ 0 -2 取整
		self.ctx.beginPath();								
		self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
		self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
		self.ctx.closePath();
		// H:颜色 0,360 红， 120 绿   240 蓝， S饱和度， L明亮度   A透明度				
		self.ctx.strokeStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+this.alpha+')';
		self.ctx.stroke();				
		
		if(self.flickerDensity > 0){                             // 闪烁密度
			var inverseDensity = 50 - self.flickerDensity;				 // 密度反向	
			if(rand(0, inverseDensity) === inverseDensity){
				self.ctx.beginPath();
				self.ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth,this.lineWidth+3)/2, 0, Math.PI*2, false)
				self.ctx.closePath();
				var randAlpha = rand(50,100)/100;
				self.ctx.fillStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+randAlpha+')';
				self.ctx.fill();
			}	
		}
	};
	
	/*=============================================================================*/	
	/* Create Particles
	/*=============================================================================*/
	self.createParticles = function(x,y, hue){
		var countdown = self.partCount;
		while(countdown--){						
			self.particles.push(new Particle(x, y, hue));
		}
	};
	
	/*=============================================================================*/	
	/* Update Particles
	/*=============================================================================*/		
	self.updateParticles = function(){
		var i = self.particles.length;
		while(i--){
			var p = self.particles[i];
			p.update(i);
		};
	};
	
	/*=============================================================================*/	
	/* Draw Particles
	/*=============================================================================*/
	self.drawParticles = function(){
		var i = self.particles.length;
		while(i--){
			var p = self.particles[i];				
			p.draw();				
		};
	};
	
	/*=============================================================================*/	
	/* Firework Constructor  开始坐标， 目标坐标
	/*=============================================================================*/
	var Firework = function(startX, startY, targetX, targetY){
		this.x = startX;
		this.y = startY;
		this.startX = startX;
		this.startY = startY;
		this.hitX = false;
		this.hitY = false;
		this.coordLast = [
			{x: startX, y: startY},
			{x: startX, y: startY},
			{x: startX, y: startY}
		];
		this.targetX = targetX;
		this.targetY = targetY;
		this.speed = self.fworkSpeed;
		this.angle = Math.atan2(targetY - startY, targetX - startX);
		this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX)+(90*(Math.PI/180));
		this.acceleration = self.fworkAccel/100;
		this.hue = self.currentHue;
		this.brightness = rand(50, 80);
		this.alpha = rand(50,100)/100;
		this.lineWidth = self.lineWidth;
		this.targetRadius = 1;
	};
	
	Firework.prototype.update = function(index){
		self.ctx.lineWidth = this.lineWidth;
			
		var vx = Math.cos(this.angle) * this.speed;
		var vy = Math.sin(this.angle) * this.speed;
		// this.speed *= 1 + this.acceleration;				
		// this.coordLast[2].x = this.coordLast[1].x;
		// this.coordLast[2].y = this.coordLast[1].y;
		// this.coordLast[1].x = this.coordLast[0].x;
		// this.coordLast[1].y = this.coordLast[0].y;
		this.coordLast[0].x = this.x;
		this.coordLast[0].y = this.y;
		
		// if(self.showTarget){
		// 	if(this.targetRadius < 8){
		// 		this.targetRadius += .25 * self.dt;
		// 	} else {
		// 		this.targetRadius = 1 * self.dt;	
		// 	}
		// }
		
		if(this.startX >= this.targetX){
			if(this.x + vx <= this.targetX){
				this.x = this.targetX;
				this.hitX = true;
			} else {
				this.x += vx * self.dt;
			}
		} else {
			if(this.x + vx >= this.targetX){
				this.x = this.targetX;
				this.hitX = true;
			} else {
				this.x += vx * self.dt;
			}
		}
		
		if(this.startY >= this.targetY){
			if(this.y + vy <= this.targetY){
				this.y = this.targetY;
				this.hitY = true;
			} else {
				this.y += vy * self.dt;
			}
		} else {
			if(this.y + vy >= this.targetY){
				this.y = this.targetY;
				this.hitY = true;
			} else {
				this.y += vy * self.dt;
			}
		}				
		
		if(this.hitX && this.hitY){
			// var randExplosion = rand(0, 9);
			self.createParticles(this.targetX, this.targetY, this.hue);
			self.fireworks.splice(index, 1);					
		}
	};
	
	Firework.prototype.draw = function(){
		self.ctx.lineWidth = this.lineWidth;
			
		// var coordRand = (rand(1,3)-1);					
		var coordRand = 0;					
		self.ctx.beginPath();							
		self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
		self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
		self.ctx.closePath();
		self.ctx.strokeStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+this.alpha+')';
		self.ctx.stroke();	
		
		// if(self.showTarget){
		// 	self.ctx.save();
		// 	self.ctx.beginPath();
		// 	self.ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI*2, false)
		// 	self.ctx.closePath();
		// 	self.ctx.lineWidth = 1;
		// 	self.ctx.stroke();
		// 	self.ctx.restore();
		// }
			
		// if(self.showShockwave){
		// 	self.ctx.save();
		// 	self.ctx.translate(Math.round(this.x), Math.round(this.y));
		// 	self.ctx.rotate(this.shockwaveAngle);
		// 	self.ctx.beginPath();
		// 	self.ctx.arc(0, 0, 1*(this.speed/5), 0, Math.PI, true);
		// 	self.ctx.strokeStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+rand(25, 60)/100+')';
		// 	self.ctx.lineWidth = this.lineWidth;
		// 	self.ctx.stroke();
		// 	self.ctx.restore();
		// }								 
	};
	
	/*=============================================================================*/	
	/* Create Fireworks
	/*=============================================================================*/
	self.createFireworks = function(startX, startY, targetX, targetY){
		self.currentHue = rand(self.hueMin, self.hueMax)			
		self.fireworks.push(new Firework(startX, startY, targetX, targetY));
	};
	
	/*=============================================================================*/	
	/* Update Fireworks
	/*=============================================================================*/		
	self.updateFireworks = function(){
		var i = self.fireworks.length;
		while(i--){
			var f = self.fireworks[i];
			f.update(i);
		};
	};
	
	/*=============================================================================*/	
	/* Draw Fireworks
	/*=============================================================================*/
	self.drawFireworks = function(){
		var i = self.fireworks.length;			
		while(i--){
			var f = self.fireworks[i];		
			f.draw();
		};
	};
	
	/*=============================================================================*/	
	/* Events
	/*=============================================================================*/
	// self.bindEvents = function(){
	// 	$(window).on('resize', function(){			
	// 		clearTimeout(self.timeout);
	// 		self.timeout = setTimeout(function() {
	// 			self.ctx.lineCap = 'round';
	// 			self.ctx.lineJoin = 'round';
	// 		}, 100);
	// 	});
		
	// 	$(self.canvas).on('mousedown', function(e){
	// 		var randLaunch = rand(0, 5);
	// 		self.mx = e.pageX - self.canvasContainer.offset().left;
	// 		self.my = e.pageY - self.canvasContainer.offset().top;
	// 		self.currentHue = rand(self.hueMin, self.hueMax);
	// 		self.createFireworks(self.cw/2, self.ch, self.mx, self.my);	
			
	// 		$(self.canvas).on('mousemove.fireworks', function(e){
	// 			var randLaunch = rand(0, 5);
	// 			self.mx = e.pageX - self.canvasContainer.offset().left;
	// 			self.my = e.pageY - self.canvasContainer.offset().top;
	// 			self.currentHue = rand(self.hueMin, self.hueMax);
	// 			self.createFireworks(self.cw/2, self.ch, self.mx, self.my);									
	// 		});	
			
	// 	});
		
	// 	$(self.canvas).on('mouseup', function(e){
	// 		$(self.canvas).off('mousemove.fireworks');									
	// 	});
					
	// }
	
	/*=============================================================================*/	
	/* Clear Canvas
	/*=============================================================================*/
	self.clear = function(){
		self.particles = [];
		self.fireworks = [];
		self.ctx.clearRect(0, 0, self.cw, self.ch);
	};
  
  /*=============================================================================*/	
	/* Delta
	/*=============================================================================*/
  self.updateDelta = function(){
		var newTime = Date.now();
		self.dt = (newTime - self.oldTime)/16;
		self.dt = (self.dt > 5) ? 5 : self.dt;
		self.oldTime = newTime;	
	}
	
	/*=============================================================================*/	
	/* Main Loop
	/*=============================================================================*/
	self.canvasLoop = function(){
		requestAnimFrame(self.canvasLoop, self.canvas);
    self.updateDelta();
		self.ctx.globalCompositeOperation = 'destination-out';
		self.ctx.fillStyle = 'rgba(0,0,0,'+self.clearAlpha/100+')';
		self.ctx.fillRect(0,0,self.cw,self.ch);
		self.ctx.globalCompositeOperation = 'lighter';
		self.updateFireworks();
		self.updateParticles();
		self.drawFireworks();			
		self.drawParticles();			
	};

	
	self.init();
  
  var initialLaunchCount = 6;
  while(initialLaunchCount--){
    setTimeout(function(){
 		self.fireworks.push(new Firework(rand(self.cw/2 - 50, self.cw/2 + 50), self.ch, rand(50, self.cw-50), rand(50, self.ch/2)-50));
    }, initialLaunchCount * 200);
	}
	
	return self;
	
	
}
export default Fireworks
// setTimeout(() => {
// 	console.log('hi')
// 	var fworks = new Fireworks();
	
// }, 2500)
/*=============================================================================*/	
/* GUI
/*=============================================================================*/	
// var guiPresets = {
// 			  "preset": "Default",
// 			  "remembered": {
// 				"Default": {
// 				  "0": {
// 					"fworkSpeed": 2,
// 					"fworkAccel": 4,
// 					"showShockwave": false,
// 					"showTarget": true,
// 					"partCount": 30,
// 					"partSpeed": 5,
// 					"partSpeedVariance": 10,
// 					"partWind": 50,
// 					"partFriction": 5,
// 					"partGravity": 1,
// 					"flickerDensity": 20,
// 					"hueMin": 150,
// 					"hueMax": 200,
// 					"hueVariance": 30,
// 					"lineWidth": 1,
// 					"clearAlpha": 25
// 				  }
// 				},
// 				"Anti Gravity": {
// 				  "0": {
// 					"fworkSpeed": 4,
// 					"fworkAccel": 10,
// 					"showShockwave": true,
// 					"showTarget": false,
// 					"partCount": 150,
// 					"partSpeed": 5,
// 					"partSpeedVariance": 10,
// 					"partWind": 10,
// 					"partFriction": 10,
// 					"partGravity": -10,
// 					"flickerDensity": 30,
// 					"hueMin": 0,
// 					"hueMax": 360,
// 					"hueVariance": 30,
// 					"lineWidth": 1,
// 					"clearAlpha": 50
// 				  }
// 				},
// 				"Battle Field": {
// 				  "0": {
// 					"fworkSpeed": 10,
// 					"fworkAccel": 20,
// 					"showShockwave": true,
// 					"showTarget": true,
// 					"partCount": 200,
// 					"partSpeed": 30,
// 					"partSpeedVariance": 5,
// 					"partWind": 0,
// 					"partFriction": 5,
// 					"partGravity": 0,
// 					"flickerDensity": 0,
// 					"hueMin": 20,
// 					"hueMax": 30,
// 					"hueVariance": 10,
// 					"lineWidth": 1,
// 					"clearAlpha": 40
// 				  }
// 				},
// 				"Mega Blast": {
// 				  "0": {
// 					"fworkSpeed": 3,
// 					"fworkAccel": 3,
// 					"showShockwave": true,
// 					"showTarget": true,
// 					"partCount": 500,
// 					"partSpeed": 50,
// 					"partSpeedVariance": 5,
// 					"partWind": 0,
// 					"partFriction": 0,
// 					"partGravity": 0,
// 					"flickerDensity": 0,
// 					"hueMin": 0,
// 					"hueMax": 360,
// 					"hueVariance": 30,
// 					"lineWidth": 20,
// 					"clearAlpha": 20
// 				  }
// 				},
// 				"Nimble": {
// 				  "0": {
// 					"fworkSpeed": 10,
// 					"fworkAccel": 50,
// 					"showShockwave": false,
// 					"showTarget": false,
// 					"partCount": 120,
// 					"partSpeed": 10,
// 					"partSpeedVariance": 10,
// 					"partWind": 100,
// 					"partFriction": 50,
// 					"partGravity": 0,
// 					"flickerDensity": 20,
// 					"hueMin": 0,
// 					"hueMax": 360,
// 					"hueVariance": 30,
// 					"lineWidth": 1,
// 					"clearAlpha": 80
// 				  }
// 				},
// 				"Slow Launch": {
// 				  "0": {
// 					"fworkSpeed": 2,
// 					"fworkAccel": 2,
// 					"showShockwave": false,
// 					"showTarget": false,
// 					"partCount": 200,
// 					"partSpeed": 10,
// 					"partSpeedVariance": 0,
// 					"partWind": 100,
// 					"partFriction": 0,
// 					"partGravity": 2,
// 					"flickerDensity": 50,
// 					"hueMin": 0,
// 					"hueMax": 360,
// 					"hueVariance": 20,
// 					"lineWidth": 4,
// 					"clearAlpha": 10
// 				  }
// 				},
// 				"Perma Trail": {
// 				  "0": {
// 					"fworkSpeed": 4,
// 					"fworkAccel": 10,
// 					"showShockwave": false,
// 					"showTarget": false,
// 					"partCount": 150,
// 					"partSpeed": 10,
// 					"partSpeedVariance": 10,
// 					"partWind": 100,
// 					"partFriction": 3,
// 					"partGravity": 0,
// 					"flickerDensity": 0,
// 					"hueMin": 0,
// 					"hueMax": 360,
// 					"hueVariance": 20,
// 					"lineWidth": 1,
// 					"clearAlpha": 0
// 				  }
// 				}
// 			  },
// 			  "closed": true,
// 			  "folders": {
// 				"Fireworks": {
// 				  "preset": "Default",
// 				  "closed": false,
// 				  "folders": {}
// 				},
// 				"Particles": {
// 				  "preset": "Default",
// 				  "closed": true,
// 				  "folders": {}
// 				},
// 				"Color": {
// 				  "preset": "Default",
// 				  "closed": true,
// 				  "folders": {}
// 				},
// 				"Other": {
// 				  "preset": "Default",
// 				  "closed": true,
// 				  "folders": {}
// 				}
// 			  }
// 			};


		
// export default Fireworks
/* var gui = new dat.GUI({
	autoPlace: false,
	load: guiPresets,
	preset: 'Default'
});
var customContainer = document.getElementById('gui');
customContainer.appendChild(gui.domElement);

var guiFireworks = gui.addFolder('Fireworks');
guiFireworks.add(fworks, 'fworkSpeed').min(1).max(10).step(1);
guiFireworks.add(fworks, 'fworkAccel').min(0).max(50).step(1);
guiFireworks.add(fworks, 'showShockwave');
guiFireworks.add(fworks, 'showTarget');

var guiParticles = gui.addFolder('Particles');
guiParticles.add(fworks, 'partCount').min(0).max(500).step(1);	
guiParticles.add(fworks, 'partSpeed').min(1).max(100).step(1);
guiParticles.add(fworks, 'partSpeedVariance').min(0).max(50).step(1);
guiParticles.add(fworks, 'partWind').min(0).max(100).step(1);
guiParticles.add(fworks, 'partFriction').min(0).max(50).step(1);
guiParticles.add(fworks, 'partGravity').min(-20).max(20).step(1);
guiParticles.add(fworks, 'flickerDensity').min(0).max(50).step(1);

var guiColor = gui.addFolder('Color');
guiColor.add(fworks, 'hueMin').min(0).max(360).step(1);
guiColor.add(fworks, 'hueMax').min(0).max(360).step(1);
guiColor.add(fworks, 'hueVariance').min(0).max(180).step(1);

var guiOther = gui.addFolder('Other');
guiOther.add(fworks, 'lineWidth').min(1).max(20).step(1);
guiOther.add(fworks, 'clearAlpha').min(0).max(100).step(1);
guiOther.add(fworks, 'clear').name('Clear');

gui.remember(fworks); */