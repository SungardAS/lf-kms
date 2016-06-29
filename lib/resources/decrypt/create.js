var AWS = require('aws-sdk');
var handler = require('lambda-formation').resource.create;
var util = require('lambda-formation').util;

var create = function (err, event, context) {
  if (err) {
    return util.done(err);
  }

  var region = event.Region || process.env.AWS_DEFAULT_REGION;

  var params = event.ResourceProperties;
  params.CiphertextBlob = new Buffer(params.CiphertextBlob, 'base64');
  var kms = new AWS.KMS({region: region});

  kms.decrypt(params, function(err, data) {
    if (err) return util.done(err,event,context);

    var returnObj = {
      KeyId: data.KeyId,
      Plaintext: data.Plaintext.toString()
    };
    util.done(null, event, context, returnObj, "ENCRYPTED");
  });

};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, create]);
};

