// import JsonClient from '../src/modules/JsonClient.js';
import SharedBox from '../src/sharedbox.js';
import Client from '../src/modules/Client.js';
import { SharedBoxException } from '../src/modules/SharedBoxException.js';
import * as Utils from '../src/Utils/platform.js';
let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

let Response = Utils.fetch.Response;
let client;
let stub;
export default describe('Client', () => {
  let fakePromise = function(promiseHelper){
    return new Promise((resolve, reject) => {
      promiseHelper(resolve,reject);
    });
  };

  beforeEach(() => {
    client= new Client('token',0,'https://endpoint.random.test');
  });

  afterEach(() => {
    stub.restore();
  });
  describe('.method', () => {

    it('initializeSharedBox test', () => {

      var jsonObject = require('../../JSON/Sharedbox.json');
      var jsonClientResponse = {
        'guid': 'dc6f21e0f02c41123b795e4',
        'uploadUrl': 'upload_url'
      };

      stub = sinon.stub(client.jsonClient,'initializeSharedBox');
      stub.returns(fakePromise(r => r(new Response(JSON.stringify(jsonClientResponse)))));

      return client.initializeSharedBox(jsonObject).then(result => {
        expect(client.jsonClient.initializeSharedBox).to.have.been.calledWith(jsonObject.userEmail);
        jsonObject.guid = jsonClientResponse.guid;
        jsonObject.uploadUrl = jsonClientResponse.uploadUrl;

        expect(result).to.deep.equal(jsonObject);
      });
    });

    it('initializeSharedBox exception test', () => {

      var jsonObject = require('../../JSON/Sharedbox.json');

      stub = sinon.stub(client.jsonClient,'initializeSharedBox');
      stub.rejects(new SharedBoxException( 400, 'Bad Request', 'ZUT'));

      return client.initializeSharedBox(jsonObject)
        .catch(error => {
          expect(client.jsonClient.initializeSharedBox).to.have.been.calledWith(jsonObject.userEmail);
          expect(error.code).to.be.equal(400);
          expect(error.message).to.be.equal('Bad Request');
          expect(error.responseContent).to.be.equal('ZUT');
          expect(error).to.be.an.instanceof(SharedBoxException);
        });
    });

    it('submitSharedBox test', () => {

      var jsonObject = require('../../JSON/Sharedbox.json');
      var jsonClientResponse = { 'guid': '1c820789a50747df8746aa5d71922a3f',
        'userId': 3,
        'subject': 'Donec rutrum congue leo eget malesuada.',
        'expiration': '2018-12-06T05:38:09.951Z',
        'notificationLanguage': 'en',
        'status':'in_progress',
        'allowRememberMe': false,
        'allowSms': false,
        'allowVoice': false,
        'allowEmail': true,
        'retentionPeriodType': 'discard_at_expiration',
        'retentionPeriodValue': null,
        'retentionPeriodUnit': null,
        'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
        'createdAt': '2018-12-05T22:38:09.965Z',
        'updatedAt': '2018-12-05T22:38:09.965Z'
      };
      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObject);

      stub = sinon.stub(client.jsonClient,'submitSharedBox');
      stub.returns(fakePromise(r => r(new Response(JSON.stringify(jsonClientResponse)))));

      return client.submitSharedBox(sharedBox).then(result => {
        expect(client.jsonClient.submitSharedBox).to.have.been.calledWith(sharedBox.toJson());

        expect(result).to.deep.equal(sharedBox);
      });
    });

    it('submitSharedBox exception test', () => {

      var jsonObject = require('../../JSON/Sharedbox.json');

      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObject);

      stub = sinon.stub(client.jsonClient,'submitSharedBox');
      stub.rejects(new SharedBoxException( 400, 'Bad Request', 'ZUT'));

      return client.submitSharedBox(sharedBox)
        .catch(error => {
          expect(client.jsonClient.submitSharedBox).to.have.been.calledWith(sharedBox.toJson());
          expect(error.code).to.be.equal(400);
          expect(error.message).to.be.equal('Bad Request');
          expect(error.responseContent).to.be.equal('ZUT');
          expect(error).to.be.an.instanceof(SharedBoxException);
        });
    });

    it('uploadAttachment test', () => {

      var jsonObject = require('../../JSON/Sharedbox.json');
      var jsonClientResponse = {
        'temporaryDocument': {
          'documentGuid': '65f53ec1282c454fa98439dbda134093'
        }
      };
      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObject);
      var attachment = new SharedBox.Helpers.Attachment('/tmp/test_TP1_LOG3430.txt');
      var param = {
        fileStream: attachment.stream,
        contentType: attachment.contentType,
        filename: attachment.filename
      };
      var response = new Response(JSON.stringify(jsonClientResponse));

      stub = sinon.stub(client.jsonClient,'uploadFile');
      stub.returns(fakePromise(r => r(response.json())));

      return client.uploadAttachment(sharedBox,attachment).then(result => {
        expect(client.jsonClient.uploadFile).to.have.been.calledWith(sharedBox.uploadUrl,param);

        attachment.guid = jsonClientResponse.temporaryDocument.documentGuid;

        expect(result).to.deep.equal(attachment);
      });
    });

    it('addRecipient test', () => {

      var jsonObjectSharedBox = require('../../JSON/Sharedbox.json');
      var jsonObjectRecipient = require('../../JSON/Recipient.json');

      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObjectSharedBox);
      var recipient = new SharedBox.Helpers.Recipient(jsonObjectRecipient);

      stub = sinon.stub(client.jsonClient,'addRecipient');
      stub.returns(fakePromise(r => r(new Response(JSON.stringify(jsonObjectRecipient)))));

      return client.addRecipient(sharedBox,recipient).then(result => {
        expect(client.jsonClient.addRecipient).to.have.been.calledWith(sharedBox.guid,recipient.toJson());

        expect(result).to.deep.equal(recipient);
      });
    });

    it('addRecipient guid exception test', () => {

      var jsonObjectSharedBox = require('../../JSON/Sharedbox.json');
      var jsonObjectRecipient = require('../../JSON/Recipient.json');

      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObjectSharedBox);
      delete sharedBox.guid;
      var recipient = new SharedBox.Helpers.Recipient(jsonObjectRecipient);

      expect( function() {
        return client.addRecipient(sharedBox,recipient);
      }).to.throw(SharedBoxException);

    });

    it('addRecipient email exception test', () => {

      var jsonObjectSharedBox = require('../../JSON/Sharedbox.json');
      var jsonObjectRecipient = require('../../JSON/RecipientNoMail.json');

      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObjectSharedBox);
      var recipient = new SharedBox.Helpers.Recipient(jsonObjectRecipient);

      expect( function() {
        return client.addRecipient(sharedBox,recipient);
      }).to.throw(SharedBoxException);

    });

    it('closeSharedbox test', () => {

      var jsonObjectSharedBox = require('../../JSON/Sharedbox.json');
      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObjectSharedBox);
      var jsonResponse = {
        'result': true,
        'message': 'Sharedbox successfully closed.'
      };

      stub = sinon.stub(client.jsonClient,'closeSharedbox');
      stub.returns(fakePromise(r => r(jsonResponse)));

      return client.closeSharedbox(sharedBox).then(result => {
        expect(client.jsonClient.closeSharedbox).to.have.been.calledWith(sharedBox.guid);

        expect(result).to.deep.equal(jsonResponse);
      });
    });

    it('closeSharedbox guid exception test', () => {

      var jsonObjectSharedBox = require('../../JSON/Sharedbox.json');

      var sharedBox = new SharedBox.Helpers.Sharedbox(jsonObjectSharedBox);
      delete sharedBox.guid;

      expect( function() {
        return client.closeSharedbox(sharedBox);
      }).to.throw(SharedBoxException);

    });

  });
});
