import SharedBox from '../src/sharedbox.js';
let assert = require('chai').assert;

export default describe('Recipient', () => {
  let recipient;

  var jsonObject = require('../../JSON/Recipient.json');

  beforeEach(() => {
    recipient = new SharedBox.Helpers.Recipient(jsonObject);
  });

  describe('.property', () => {
    it('Consructor test', () => {
      assert.equal(recipient.firstName,jsonObject.firstName,'Sniff');

      assert.equal(recipient.lastName,jsonObject.lastName,'wrong');

      assert.equal(recipient.email,jsonObject.email,'wrong');
      assert.equal(recipient.id,jsonObject.id,'wrong');

      assert.equal(recipient.options.locked,jsonObject.options.locked,'wrong');
      assert.equal(recipient.options.bouncedEmail,jsonObject.options.bouncedEmail,'wrong');
      assert.equal(recipient.options.verified,jsonObject.options.verified,'wrong');

      for (var i = 0; i < jsonObject.options.contactMethods.length; i++) {
        assert.deepEqual(recipient.options.contactMethods[i].id,jsonObject.options.contactMethods[i].id,'wrong');
        assert.deepEqual(recipient.options.contactMethods[i].destination,jsonObject.options.contactMethods[i].destination,'wrong');
        assert.deepEqual(recipient.options.contactMethods[i].destinationType,jsonObject.options.contactMethods[i].destinationType,'wrong');
        assert.deepEqual(recipient.options.contactMethods[i].verified,jsonObject.options.contactMethods[i].verified,'wrong');
        assert.deepEqual(recipient.options.contactMethods[i].createdAt,jsonObject.options.contactMethods[i].createdAt,'wrong');
        assert.deepEqual(recipient.options.contactMethods[i].updatedAt,jsonObject.options.contactMethods[i].updatedAt,'wrong');
      }
    });
  });
  describe('.method', () => {
    it('toJson  test', () => {
      var jsonAnswer = JSON.parse(recipient.toJson());
      assert.equal(jsonAnswer.recipient.email,jsonObject.email,'wrong');
      assert.equal(jsonAnswer.recipient.firstName,jsonObject.firstName,'wrong');
      assert.equal(jsonAnswer.recipient.lastName,jsonObject.lastName,'wrong');
    });
  });
});
