function CountDown(initDate, id){
		this.endDate = new Date(initDate);
		this.countainer = document.getElementById(id);
		this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
		this.hours = 0, this.minutes = 0, this.seconds = 0;
		this.TotalDaysMonths = 0;
		this.updateNumOfDays();
		this.updateCounter();
	}
	  
	CountDown.prototype.updateNumOfDays=function(){
		var dateNow = new Date();
		var currYear = dateNow.getFullYear();
		if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
			this.numOfDays[1] = 29;
		}
		var self = this;
		setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
	}
	
	CountDown.prototype.calculateDays=function(currMonth, endMonth){
		var numDays=0;
		var futureDate = this.endDate;
		var currDate = new Date();
		if ((endMonth - currMonth) > -1){
			end = endMonth;
		}else {
			end = 12 - endMonth;
		}
			for (i = currMonth; i < end; i++) {
				numDays += this.numOfDays[i];
			}
		return (numDays - currDate.getDate() + futureDate.getDate());
	}
	
	CountDown.prototype.datePartDiff=function(then, now, MAX){
		var diff = now - then - this.borrowed;
		this.borrowed = 0;
		if ( diff > -1 ) return diff;
		this.borrowed = 1;
		return (MAX + diff);
	}
	  
	CountDown.prototype.calculate=function(){
		var futureDate = this.endDate;
		var currDate = new Date();
		this.days = this.datePartDiff(currDate.getDate(), futureDate.getDate(), this.numOfDays[futureDate.getMonth()]);
		this.months = this.datePartDiff(currDate.getMonth(), futureDate.getMonth(), 12);
		this.years = this.datePartDiff(currDate.getFullYear(), futureDate.getFullYear(),0);
		this.TotalDaysMonths = this.calculateDays(currDate.getMonth(),futureDate.getMonth())+this.years*365;
	}
	  
	/*CountDown.prototype.addLeadingZero=function(value){
		return value < 10 ? ("0" + value) : value;
	}*/
	  
	/*CountDown.prototype.formatTime=function(){
		this.seconds = this.addLeadingZero(this.seconds);
		this.minutes = this.addLeadingZero(this.minutes);
		this.hours = this.addLeadingZero(this.hours);
	}*/
	  
	CountDown.prototype.updateCounter=function(){
		this.calculate();
		/*this.formatTime();*/
		this.countainer.innerHTML =
			/*"<strong>" + this.years + "</strong> <small>" + (this.years == 1? "year" : "years") + "</small>" +
		   " <strong>" + this.months + "</strong> <small>" + (this.months == 1? "month" : "months") + "</small>" +
		   " <strong>" + this.days + "</strong> <small>" + (this.days == 1? "day" : "days") + "</small>" +
		   " <strong>" + this.hours + "</strong> <small>" + (this.hours == 1? "hour" : "hours") + "</small>" +*/
		   "<strong>" + this.TotalDaysMonths + "</strong> " + (this.TotalDaysMonths == 1? "day" : " ");
		if ( this.endDate > (new Date()) ) {
			var self = this;
			setTimeout(function(){self.updateCounter();}, 1000);
		}
	}
	$(document).ready( 
		window.onload=function(){ new CountDown('August 20, 2016 00:00:00', 'counter'); }
	);