// CAROUSEL OBJECT
function Carousel(containerID) {
	this.container = document.getElementById(containerID) || document.body;
	this.slides = this.container.querySelectorAll('.carousel');
	this.total = this.slides.length - 1;
	this.current = 0;
	
	// Store current layout so we can swap between original layout and fullscreen view
	this.enlarged = false;
	this.position = this.container.style.position;
	this.top = this.container.style.top;
	this.left = this.container.style.left;
	this.width = this.container.style.width;
	this.zIndex = this.container.style.zIndex;
	
	this.curtain = document.getElementById('CarouselCurtain');
	
	// start on slide 1
	this.slide(this.current);
}
// NEXT
Carousel.prototype.next = function () {
	(this.current === this.total) ? this.current = 0 : this.current += 1;
	
	this.slide(this.current);
	
};
// PREVIOUS
Carousel.prototype.prev = function () {	
	(this.current === 0) ? this.current = this.total : this.current -= 1;
			
	this.slide(this.current);
};
// SELECT SLIDE
Carousel.prototype.slide = function (index) {	
	if (index >= 0 && index <= this.total) { 
		for (var s = 0; s <= this.total; s++) {
			if (s === index) {
				this.slides[s].style.display = "inline-block"; 
			} else {
				this.slides[s].style.display = 'none';
			}
		}
	} else {
		alert("Index " + index + " doesn't exist. Available : 0 - " + this.total);
	}
};

// EXPAND CAROUSEL TO FILL BROWSER WINDOW OR RETURN TO NORMAL POSITION
Carousel.prototype.changeSize = function(){
	if (this.enlarged){
		this.container.style.position = this.position;
		this.container.style.top = this.top;
		this.container.style.left = this.left;
		this.container.style.width = this.width;
		this.container.style.zIndex = this.zIndex;
		this.curtain.style.display = 'none';
	}
	else{
		if (window.matchMedia('(max-width: 800px)').matches){
		return;
		}
		else if (window.matchMedia('(max-width: 1200px)').matches){
			this.container.style.left = '10%';
			this.container.style.width = '80%';
		}
		else{
			this.container.style.left = '20%';
			this.container.style.width = '60%';
		}
		
		this.container.style.position = 'fixed';
		this.container.style.top = (window.innerHeight/2 - this.container.clientHeight/2) + 'px';
		this.container.style.zIndex = '6';
		this.curtain.style.display = 'block';
	}
	this.enlarged = !this.enlarged;
};