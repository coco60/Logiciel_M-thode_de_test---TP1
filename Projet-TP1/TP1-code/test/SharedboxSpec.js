import SharedBox from '../src/sharedbox.js';
// import _map from 'lodash/map';
// import _partial from 'lodash/partial';
let assert = require('chai').assert;
// let expect = require('chai').expect;

export default describe('SharedBox', () => {
  let sharedbox;

  var jsonObject = require('../../JSON/Sharedbox.json');

  beforeEach(() => {
    sharedbox = new SharedBox.Helpers.Sharedbox(jsonObject);
  });

  describe('.property', () => {
    it('Constructor test', () => {
      assert.equal(sharedbox.userId,jsonObject.userId,'Sniff');

      assert.equal(sharedbox.status,jsonObject.status,'Sniff');

      assert.equal(sharedbox.previewUrl,jsonObject.previewUrl,'Sniff');

      assert.equal(sharedbox.createdAt,jsonObject.createdAt,'Sniff');

      assert.equal(sharedbox.updatedAt,jsonObject.updatedAt,'Sniff');

      assert.equal(sharedbox.closedAt,jsonObject.closedAt,'Sniff');

      for (var i = 0; i < jsonObject.recipients.length; i++) {
        assert.equal(sharedbox.recipients[i].lastName,jsonObject.recipients[i].lastName,'Sniff');
        assert.equal(sharedbox.recipients[i].firstName,jsonObject.recipients[i].firstName,'Sniff');
        assert.equal(sharedbox.recipients[i].email,jsonObject.recipients[i].email,'Sniff');
      }

      for (var j = 0; j < jsonObject.attachments.length; j++) {
        assert.equal(sharedbox.attachments[j].filename,jsonObject.attachments[j].split('/').pop(),'Sniff');
      }
    });
  });

  describe('.method', () => {
    it('toJson test', () => {
      var jsonAnswer = JSON.parse(sharedbox.toJson());
      assert.equal(jsonAnswer.sharedbox.guid,jsonObject.guid,'wrong');
      assert.equal(jsonAnswer.sharedbox.userEmail,jsonObject.userEmail,'wrong');
      assert.equal(jsonAnswer.sharedbox.uploadUrl,jsonObject.uploadUrl,'wrong');
      assert.equal(jsonAnswer.sharedbox.subject,jsonObject.subject,'wrong');
      assert.equal(jsonAnswer.sharedbox.message,jsonObject.message,'wrong');
    });
    // demander à la prof si il faut faire des tests supplémentaires pas forcément
    // relevant vu que ça depend du json et de ses attributs
  });
});
