import SharedBox from '../src/sharedbox.js';
// import _map from 'lodash/map';
// import _partial from 'lodash/partial';
let assert = require('chai').assert;
// let expect = require('chai').expect;

export default describe('Recipient', () => {
  let sharedbox;

  var jsonObject = require('../../JSON/Sharedbox.json');

  beforeEach(() => {
    sharedbox = new SharedBox.Helpers.Sharedbox(jsonObject);
  });

  describe('.property', () => {
    it('userId sharedbox test', () => {
      assert.equal(sharedbox.userId,jsonObject.userId,'Sniff');
    });
    it('status sharedbox test', () => {
      assert.equal(sharedbox.status,jsonObject.status,'Sniff');
    });
    it('previewUrl sharedbox test', () => {
      assert.equal(sharedbox.previewUrl,jsonObject.previewUrl,'Sniff');
    });
    it('createdAt sharedbox test', () => {
      assert.equal(sharedbox.createdAt,jsonObject.createdAt,'Sniff');
    });
    it('updatedAt sharedbox test', () => {
      assert.equal(sharedbox.updatedAt,jsonObject.updatedAt,'Sniff');
    });
    it('closedAt sharedbox test', () => {
      assert.equal(sharedbox.closedAt,jsonObject.closedAt,'Sniff');
    });
    it('recipients sharedbox test', () => {
      for (var i = 0; i < jsonObject.recipients.length; i++) {
        assert.equal(sharedbox.recipients[i].lastName,jsonObject.recipients[i].lastName,'Sniff');
        assert.equal(sharedbox.recipients[i].firstName,jsonObject.recipients[i].firstName,'Sniff');
        assert.equal(sharedbox.recipients[i].email,jsonObject.recipients[i].email,'Sniff');
      }
    });
    it('attachments sharedbox test', () => {
      for (var i = 0; i < jsonObject.attachments.length; i++) {
        assert.equal(sharedbox.attachments[i].filename,jsonObject.attachments[i].split('/').pop(),'Sniff');
      }
    });
    it('toJson sharedbox test', () => {
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
