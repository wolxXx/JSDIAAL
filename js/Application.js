var dependency = null;

function writeToLog(message){
	document.getElementById('log').innerHTML += message + '<br />';
}

window.addEventListener('load', function(){
	dependency = new MyLib_Dependency();

	writeToLog('dependency container loaded');

	writeToLog('current pew pew counter: ' + dependency.getPewPew().getCounter());
	writeToLog(dependency.getPewPew().cathew());
	writeToLog('current pew pew counter: ' + dependency.getPewPew().getCounter());
	writeToLog(dependency.getPewPew().cathew());
	writeToLog('current pew pew counter: ' + dependency.getPewPew().getCounter());

	writeToLog('');

	writeToLog('current foobar counter: ' + dependency.getFoobar().getCounter());
	writeToLog(dependency.getFoobar().doFoo());
	writeToLog('current foobar counter: ' + dependency.getFoobar().getCounter());
	writeToLog(dependency.getFoobar().doFoo());
	writeToLog('current foobar counter: ' + dependency.getFoobar().getCounter());
});
