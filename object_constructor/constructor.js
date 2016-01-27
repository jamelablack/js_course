function Vehicle() { // vehicle consructor, which operates just as the builtin contructors for Objects, Array, RegExp, and Math
}

Vehicle.prototype = {
  doors: 4,
  wheels: 4
};

var sedan = new Vehicle();
var coupe = new Vehicle();

coupe.doors = 2; //What if we want to changoe the number of doors to a coupe

//use hasOwnProperty to see if property is set outside of the prototype
console.log(sedan.hasOwnProperty("doors")); // false
console.log(coupe.hasOwnProperty("doors")); // true

// But everytime we want to create a coupe, we don't want to have to set thw doors property to 2
// Create a coupe constructor/prototype that inherits from vehicle and sets doors to 2

function Coupe {
}

Coupe.prototype = new Vehicle();
Coupe.prototype.doors = 2;

// If we create a variable and assign it to the coupe instance

var crx = new Coupe();

console.log(crx instanceOf Vehicle); //true
console.log(crx instanceOf Coupe); // true
console.log(sedan instanceOf Vehicle); // false

// If pwe create a motorcycle constructor/prototype


function Motorcyle {
}

Motorcyle.prototype = new Vehicle();
Motorcyle.doors = 0; // no, wrong, you have to include the protoype
Motorcyle.wheels = 2;


Motorcyle.prototype.doors = 0;
Motorcyle.prototype.wheels = 2;
var monster = new Motorcyle();


//What if we wanted to drop the new keyword from the constructors, change the constructor to:

function Vehicle {
  if (!(this instanceof Vehicle)) {
	  return new Vehicle();
  }
  return this;
}

var sedan = Vehicle();

//Update Coupe

function Coupe() {
  if (!(this instanceof Coupe)) {
    return new Coupe();
  }
  return this;
}
//Update Motorcycle

function Motorcyle() {
  var o = this;
    if o (!(o instanceof Motorcycle)) {
      o = new Motorcyle();
    }
    o.doors = 0;
    o.wheels = 2;
    return o;
}

//creaate a sedan contructor/prototype using Object.create

function Sedan() {
}

Sedan.prototype = Object.create(Vehicle.prototype);

var lesabre = new Sedan();

var prototype_car = {
  doors: 5,
  wheels: 3
};

var ceo_car = Object.create(prototype_car);

ceo_car.doors = 7;
console.log(ceo_car.doors); // 5
console.log(prototype_car.doors); // 7

