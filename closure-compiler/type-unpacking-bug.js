const {Public, testOnly} = require('./types.js');
const {Private} = testOnly;

let /** !Public */ pub;  // OK
let /** !Public.SubType */ sub;  // OK
let /** !Private */ private1;  // WARNING: Unknown type Private
let /** !testonly.Private */ private2;  // WARNING: Unknown type testOnly.Private
