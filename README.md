# orienteer
####A simple, basic object oriented framework for javascript

####Extend objects

```javascript

/*
 * Inherit from classes with the extend method.
 * Call the constructor of the base class with this._super(args...)
 */

// orienteer is the base object for all others
var myClass1 = orienteer.extend(function () {
	// call the constructor of the base class
	this._super();
});

var myClass2 = myClass1.extend(function () {
	// call the constructor of the base class
	this._super();
});

/*
 * Use the prototype to add methods
 * Call a method in the the base class with this._super(args...)
 */
 
 myClass1.prototype.sayHi = function () {
 	return "Hi from class 1.";
 }
 
 myClass2.prototype.sayHi = function () {
 	return this._super() + " Hi from class 2.";
 }
  
 // logs: "Hi from class 1. Hi from class 2."
 console.log(new myClass2().sayHi());

/*
 * List an entire ancestor chain with getInheritanceChain
 */
 
 // logs: [myClass2, myClass1, orienteer, Object]
 console.log(orienteer.getInheritanceChain(myClass2));
 
 ```

####Things to note
* Learn about object oriented programming here: http://en.wikipedia.org/wiki/Object-oriented_programming
* Orienteer does not support private or protetected members. Javascript does not support this paradigm and forcing it to (via module patterns etc...) is resource intensive and breaks the prototype chain which orienteer depends on. Use notation instead, for instance you may wish to prefix private properties with a "__" to let other developers know they should not use these values