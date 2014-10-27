var MyLib_PewPew = Class({
	counter: 0,

	cathew: function(){
		return 'bar is ' + this.counter++;
	},

	getCounter: function(){
		return this.counter;
	}
});
