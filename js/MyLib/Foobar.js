var MyLib_Foobar = Class({
	counter: 0,

	doFoo: function(){
		return 'bar is ' + this.counter++;
	},

	getCounter: function(){
		return this.counter;
	}
});
