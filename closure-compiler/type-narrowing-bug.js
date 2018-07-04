// Reproduce a possible bug in type narrowing.
//
// When compiled with -O=ADVANCED_OPTIMIZATIONS, this code generates
// warnings:
//
// type-narrowing-bug.js:22: WARNING - actual parameter 1 of
// Array.prototype.includes does not match formal parameter
// found   : *
// required: Object
//       objects.includes(node)) {
//                        ^^^^
//
// And similarly for the calls to .push and .getOwnPropertyNames.

/**
 * Add all objects to a list, recursively.
 * @param {*} node JavaScript value to search.
 * @param {!Array<!Object>} objectList Array to add objects to.
 */
function add(node, objectList) {
  if (!node || (typeof node !== 'object' && typeof node !== 'function') ||
      objectList.includes(node)) {
    return;
  }
  objectList.push(node);
  var names = Object.getOwnPropertyNames(node);
  for (var i = 0; i < names.length; i++) {
    add(node[names[i]], objectList);
  }
}
