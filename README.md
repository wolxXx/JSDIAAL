<h1>JSDIAAL (JavaScript Dependency Injection And AutoLoading)</h1>

<ul>
    <li>
        About
    </li>
    <li>
        License
    </li>
    <li>
        Installation
    </li>
    <li>
        Examples
    </li>
    <li>
        Author
    </li>
</ul>

<h2>About</h2>
<h3>What the hell is JSDIAAL?</h3>
JSDIAAL was made in the need of having dependency configuration and injection in JavaScript applications. 
Furthermore, if you typically create a web application, you are required to load all available resource files. 
Even if the client never uses them. What a waste of resources!
 
JSDIAAL' s part in your web application: check if a requested resource exists, 
load it if not, instantiate or return an already instantiated class.

Sound difficult? Nope. 

<h3>joii?</h3>
There are a couple of great JavaScript frameworks out there. And jQuery. I really hate jQuery. Why? 
Ever tried to declare classes, interfaces, abstracts, inheritance with jQuery without another framework? Jepp, that's why joii!

If you are in the lucky position to have MooTools or another great JavaScript framework, ignore joii yet. But take a look later!! 

<h2>License</h2>

MIT, general free, use it, extend it, love it

<h2>Installation</h2>

First of all, include the needed files. <br />
<pre>
<code>
    < script src="js/vendor/joii/joii.js"></script><br />
    < script src="js/vendor/joii/plugins/joii.mixin.js"></script><br />
    < script src="js/configuration/dependency.js"></script><br />
    < script src="js/MyLib/Dependency.js"></script><br />
    < script src="js/Application.js"></script><br />
</code>
</pre>

The rest does JSDIAAL for you!

<i>almost...</i>

Make sure, all declared classes have dedicated files.<br />
Your declared a class <b>MyLib_Foo_Bar</b>? Put it under <b>/js/MyLib/Foo/Bar.js</b>!<br />
If you have it somewhere other than js/, change MyLib/Dependency.js...

<h3>js/configuration/dependency.js</h3>
Here is what is the most essential part in JSDIAAL: the configuration of your dependencies. 

<pre>
<code>
var dependencyConfiguration = {
	foobar: { // name of your dependency
		shared: true, // share this if instantiated!
		className: 'MyLib_Foobar' // which class is meant?
	},
	pewpew: {
		shared: false, // always create a fresh instance!
		className: 'MyLib_PewPew' // 
	},
	user: {
		shared: false,
		className: 'MyLib_Model_User'
	}
};
</code>
</pre>

<h3>js/MyLib/Dependency.js</h3>
The loading, instantiating an managing class. 

<h3>js/Application.js</h3>
What is really needed: global accessible variable:
<pre>
<code>
var dependency = null;
</code>
</pre>

If document is fully loaded, instantiate the dependency class:<br /> 
<pre>
<code>
window.addEventListener('load', function(){<br />
    dependency = new MyLib_Dependency();<br />
});<br />
</code>
</pre>

Now JSDIALL is ready to use: 

<pre>
<code>
dependency.getPewPew().cathew()
dependency.getPewPew().getCounter()
dependency.getFoobar().doFoo()
dependency.getFoobar().getCounter()
</code>
</pre>

See index.html for a full example! Have an eye on FireBug or whatever shows you the loaded files and JavaScript console ;) 

<h2>Author</h2>

- wolxXx
- born in early january 1985
- living in Dessau - Germany | working in Berlin - Germany 
- https://wolxxx.de 
- devops@wolxXx.de
- https://git.wolxxx.de 
- https://github.com/wolxXx

