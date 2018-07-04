// Reproduction of bug in Array.prototype.join handling of recursive
// arraylike data structures.  Reported:
// https://bugs.chromium.org/p/v8/issues/detail?id=7707

var a = ['The', 'TTP', 'Project'];
a.join(' ');  // Fine: non-cyclic.  Returns 'The TTP Project'.

a[1] = a;
a.join(' ');  // Fine: cycle detection works.  Returns 'The  Project'.

var o = {
  0: 'The',
  1: 'TTP',
  2: 'Project',
  length: 3,
  join: Array.prototype.join,
  toString: Array.prototype.toString
};

o.join(' ');  // Fine: non-cyclic.  Returns 'The TTP Project'.

o[1] = o;

o.join(' ');  // RangeError: Maximum call stack size exceeded.
