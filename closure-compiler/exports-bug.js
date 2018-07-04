// Reproduction of what turned out to be
// https://github.com/google/closure-compiler/issues/2932
//
// Compile with:
// $ closure-compiler --flagfile=exports-bug.flags
//
// Gives bizarre error:
//
// exports-bug.js:13: ERROR - variable foo is undeclared
// exports.foo = exports.bar = foo;
//                             ^^^

exports.foo = exports.bar = foo;

function foo() {
}
