var handler = require('lambda-formation').resource.delete;
var util = require('lambda-formation').util;

/*
  Here is a skelton of what the delete function might look like.
  Change to fit your needs.
*/
var destroy = function (err, event, context) {
  if (err) {
    return util.done(err);
  }
  //noop
  util.done(null, event, context, {});
};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, destroy]);
};

