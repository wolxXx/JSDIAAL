var MyLib_Model_User = Class({
	id: null,
	email: null,

	setId: function(id){
		this.id = id;

		return this;
	},

	getId: function(){
		return this.id;
	},

	setName: function(name){
		this.name = name;

		return this;
	},

	getName: function(){
		return this.name;
	}
});
