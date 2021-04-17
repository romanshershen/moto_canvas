
window.addEventListener('load', async () => {
	if (navigator.serviceWorker){
		try{
			const reg = await navigator.serviceWorker.register('/sw.js')
			console.log('Service worker register success', reg)
	
		} catch(e) {
			console.log('Service worker register failed')
		}
		
	}
})





let c = document.createElement("canvas");
let ctx = c.getContext("2d");
c.width = window.innerWidth; 
c.height = window.innerHeight * 0.85;



const scoreEl = document.querySelector('#scoreEl');
let score = 0;
let file = "score.json";


document.body.appendChild(c);

let perm = [];
while (perm.length < 255){
	while(perm.includes(val = Math.floor(Math.random()*255)));
	perm.push(val);
}



let lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI))/2;
let noise = x => {
	x = x * 0.007 % 255;
	return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}



let player = new function() {
	this.x = c.width/2;
	this.y = 0;
	this.ySpeed = 0;
	this.rot = 0;
	this.rSpeed = 0;

	this.img = new Image();
	this.img.src = "moto.png";
	
	this.draw = function(){
		let p1 = c.height - noise(t + this.x) * 0.25;
		let p2 = c.height - noise(t + 5 + this.x) * 0.25;
		let grounded = 0;
		if(p1 - 30 > this.y){
			this.ySpeed += 0.1;
		} else{
			this.ySpeed -= this.y - (p1 - 30);
			this.y = p1 - 30;
			grounded = 1;
			
		}
		if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5){
			playing = false;
			this.rSpeed = 5;
			k.ArrowUp = 1;
			this.x -= speed * 0.1;
		}
		
		let angle = Math.atan2((p2 - 30) - this.y, (this.x + 4) - this.x);
		this.y += this.ySpeed;
		
		if (grounded && playing){
			this.rot -= (this.rot - angle) * 0.5;
			this.rSpeed = this.rSpeed - (angle - this.rot);
		}
		
	
	// УПАЛ НА ГОЛОВУ	
		if (!playing && !grounded && Math.abs(this.rot) > Math.PI * 0.7){
			
			scor.style.display = 'none';
			$('body').append('<p class="big">Your score:</p>');
			bigScoreEl.innerHTML = score;				
			speed = 0;
			

			
			bigScoreEl.style.display = 'block';
			reload.style.display = 'block';
			score_salto.style.display = 'none';
			window.location.stop();
			
				localStorage.setItem('key', score);
				
				localStorage.getItem('1');

			
		}
		

// При сальто


		if ( Math.abs(this.rot) >= Math.PI * 0.99){	
			score += 100;
			document.getElementById("scoreEl").childNodes[0].nodeValue = score;
			$('body').append('<p id="score_salto" class="score_salto">+100</p>');
			
		}  
		
		
		
		

	   


		this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
		this.rot -= this.rSpeed * 0.1;
		if(this.rot > Math.PI) this.rot = -Math.PI;
		if(this.rot < -Math.PI) this.rot = Math.PI;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.drawImage(this.img, -30, -30, 65, 65);
		ctx.restore(this.rot);
		
	}
	
}




let t = 0;
let speed = 0;

let playing = true;
let k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};

function loop() {
	
	speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.02;
	t += 12 * speed;
	
	let my_gradient = ctx.createLinearGradient(0, 0, 100, 800);
    my_gradient.addColorStop(0, "#196284");
    my_gradient.addColorStop(1, "#20ad72");
	
	
    ctx.fillStyle = my_gradient;
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.moveTo (0, c.height);
	for (let i = 0; i < c.width; i++) {
		ctx.lineTo(i, c.height - noise(t + i) * 0.25);
	}
	
	ctx.lineTo(c.width, c.height);
	ctx.fill();

	player.draw();
	requestAnimationFrame(loop);

	
}

 onkeydown = d=> k[d.key] = 1;
 onkeyup = d=> k[d.key] = 0;


 
 
 
loop();


function upTrue(){keys[38] = true;}
function upFalse(){keys[38] = false;}

let upKey = document.getElementById('up');

function move() {
	k.ArrowUp = 1;

}
function moveup() {
	k.ArrowUp = 0;

}


function movedown() {
	k.ArrowUp = 1;
}

function moveupBack() {
	k.ArrowDown = 0;
}

function movedownBack() {
	k.ArrowDown = 1;
}

function moveupleft() {
	k.ArrowLeft = 0;
}

function movedownleft() {
	k.ArrowLeft = 1;
}

function moveupright() {
	k.ArrowRight = 0;
}

function movedownright() {
	k.ArrowRight = 1;
}
function init()
{
	sec = 0;
	setInterval(tick, 1000);
}
function tick()
{
	sec++;
		if (sec >= 3 && k.ArrowUp == 1 ){
			score += 10;
			document.getElementById("scoreEl").childNodes[0].nodeValue = score;
		}		
}
function openMenu() {
	$('.header_burger, .header_menu').toggleClass('active');
}
function openBg() {
	$('.header_burger, .openbg').toggleClass('active');
	openbg.style.display = 'block';
	header_menu.style.display = 'none';	
}

$(".res").keyup(function(event){
    if(event.keyCode == 13){
       window.location.reload();

    }
});