/** @constructor */
function Public() {}

/** @constructor */
Public.SubType = function() {};

/** @constructor */
function Private() {}

exports.Public = Public;
exports.testOnly = {Private};
