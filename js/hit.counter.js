function HitCounter(id){
this.countainerId = document.getElementById(id);
this.updateHitCounter();
}

HitCounter.prototype.updateHitCounter=function(){
	
	// create an instance of the Date object
	var today = new Date();
	// fix the bug in Navigator 2.0, Macintosh
	fixDate(today);
	// cookie expires in one year (actually, 365 days)
	// 365 days in a year
	// 24 hours in a day
	// 60 minutes in an hour
	// 60 seconds in a minute
	// 1000 milliseconds in a second
	
	today.setTime(today.getTime() + 365 * 24 * 60 * 60 * 1000);
	
	var visits = getCookie("hitcounter");
	
	// if the cookie was not found, this is your first visit 
	if (!visits) {
	  visits = 1; // the value for the new cookie 	  
	} else {
	  // increment the counter
	  visits = 1 + parseInt(visits);
	}
	// set the new cookie
	
	
	/////////////
	setCookie("hitcounter", visits, today);
	
	this.countainerId.innerHTML = visits;
}
$(document).ready(
	window.onload=function(){ new HitCounter('HitCounter'); }
);