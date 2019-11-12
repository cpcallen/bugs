/* The documentation says that util.format('%s', obj) will call
 * String(obj) iff obj has a user-defined .toString method, but in
 * v12.12.0 it only calls String(obj) if either obj or
 * obj.constructor.prototype has an own property named toString,
 * causing inherited toString implementations to be ignored.
 * 
 * Submitted as https://github.com/nodejs/node/issues/30333
 */

// ES6 subclassing:
class A {
  toString() {
    return 'custom A';
  }
}

class B extends A {
}

// ES5 subclassing:
function C() {
};

C.prototype.toString = function() {
  return 'custom C';
}

function D() {
  C.call(this);
}

D.prototype = Object.create(C.prototype);
// What if we forget to set the .constructor?
// D.prototype.constructor = D;

console.log('%s', new A());  // expected/actual: custom A
console.log('%s', new B());  // expected: custom A / actual: B {}
console.log('%s', new C());  // expected/actual: custom C
console.log('%s', new D());  // expected/actual: custom C (!)

// Fix forgotten .constructor:
D.prototype.constructor = D;
console.log('%s', new D());  // expected: custom C / actual: D {}
