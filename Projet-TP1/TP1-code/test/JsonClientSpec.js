import JsonClient from '../src/modules/JsonClient.js';
import * as Utils from '../src/Utils/platform.js';
let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

let Response = Utils.fetch.Response;
let jsonClient;
export default describe('JsonClient', () => {
  let fakePromise = function(promiseHelper){
    return new Promise((resolve, reject) => {
      promiseHelper(resolve,reject);
    });
  };

  function stubOnCall(jsonResponse){
    var stub = sinon.stub(Utils,'fetch');

    stub.onFirstCall().returns(fakePromise(r => r(new Response('https://endpoint.random.test/'))));
    stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(jsonResponse)))));
  }

  function stubOnCallError(jsonResponse){
    var stub = sinon.stub(Utils,'fetch');

    stub.onFirstCall().returns(fakePromise(r => r(new Response('https://endpoint.random.test/'))));
    stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(jsonResponse), { status : 403}))));
  }

  beforeEach(() => {
    jsonClient = new JsonClient('token',0,'https://endpoint.random.test');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('.method', () => {

    it('initializeSharedBox JsonClient test', () => {

      var jsonResponse = {
        guid: 'dc6f21e0f02c41123b795e4',
        uploadUrl: 'https://endpoint.random.test/'
      };

      stubOnCall(jsonResponse);

      return jsonClient.initializeSharedBox('darth.vader@email.com').then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://endpoint.random.test/api/sharedboxes/new?email=darth.vader@email.com',
          { headers: {'Authorization-Token':'token'}, method : 'get'}
        );
        expect(result.guid).to.equal('dc6f21e0f02c41123b795e4');
      });
    });

    it('initializeSharedBox endpoint exception test', () => {

      var jsonResponse = {
        guid: 'dc6f21e0f02c41123b795e4',
        uploadUrl: 'https://endpoint.random.test/'
      };
      var stub = sinon.stub(Utils,'fetch');
      var errorResponse = new Response('https://endpoint.random.test/', { status : 404});

      stub.onFirstCall().returns(fakePromise(r => r(errorResponse)));
      stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(jsonResponse)))));

      return jsonClient.initializeSharedBox('darth.vader@email.com')
        .catch(error => {
          expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
          expect(error.code).to.deep.equal(404);
          expect(error.message).to.deep.equal('Not Found');
        });
    });

    it('initializeSharedBox request exception test', () => {

      var jsonResponse = {
        guid: 'dc6f21e0f02c41123b795e4',
        uploadUrl: 'https://endpoint.random.test/'
      };

      stubOnCallError(jsonResponse);

      return jsonClient.initializeSharedBox('darth.vader@email.com')
        .catch(error => {
          expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
          expect(Utils.fetch).to.have.been.calledWith(
            'https://endpoint.random.test/api/sharedboxes/new?email=darth.vader@email.com',
            { headers: {'Authorization-Token':'token'}, method : 'get'}
          );
          expect(error.code).to.deep.equal(403);
          expect(error.message).to.deep.equal('Forbidden');
        });
    });

    it('submitSharedBox test', () => {

      var jsonResponse = { 'guid': '1c820789a50747df8746aa5d71922a3f',
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

      stubOnCall(jsonResponse);

      return jsonClient.submitSharedBox('nijrldjbsvhdlfkbr').then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://endpoint.random.test/api/sharedboxes',
          {body:'nijrldjbsvhdlfkbr', headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'post'}
        );
        expect(result).to.deep.equal(jsonResponse);
      });
    });

    it('submitSharedBox request exception test', () => {

      var jsonResponse = { 'guid': '1c820789a50747df8746aa5d71922a3f',
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

      stubOnCallError(jsonResponse);

      return jsonClient.submitSharedBox('nijrldjbsvhdlfkbr')
        .catch(error => {
          expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
          expect(Utils.fetch).to.have.been.calledWith(
            'https://endpoint.random.test/api/sharedboxes',
            {body:'nijrldjbsvhdlfkbr', headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'post'}
          );
          expect(error.code).to.deep.equal(403);
          expect(error.message).to.deep.equal('Forbidden');
        });
    });

    it('addRecipient test', () => {
      var jsonObject = require('../../JSON/Recipient.json');

      stubOnCall(jsonObject);

      return jsonClient.addRecipient('dc6f21e0f02c41123b795e4',jsonObject).then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://endpoint.random.test/api/sharedboxes/dc6f21e0f02c41123b795e4/recipients',
          {body:jsonObject, headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'post'}
        );
        expect(result).to.deep.equal(jsonObject);
      });
    });

    it('addRecipient request exception test', () => {
      var jsonObject = require('../../JSON/Recipient.json');

      stubOnCallError(jsonObject);

      return jsonClient.addRecipient('dc6f21e0f02c41123b795e4',jsonObject)
        .catch(error => {
          expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
          expect(Utils.fetch).to.have.been.calledWith(
            'https://endpoint.random.test/api/sharedboxes/dc6f21e0f02c41123b795e4/recipients',
            {body:jsonObject, headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'post'}
          );
          expect(error.code).to.deep.equal(403);
          expect(error.message).to.deep.equal('Forbidden');
        });
    });

    it('closeSharedbox success JsonClient test', () => {
      var jsonResponse = {
        'result': true,
        'message': 'Sharedbox successfully closed.'
      };

      stubOnCall(jsonResponse);

      return jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4').then(result => {
        expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
        expect(Utils.fetch).to.have.been.calledWith(
          'https://endpoint.random.test/api/sharedboxes/dc6f21e0f02c41123b795e4/close',
          {headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'patch'}
        );
        expect(result).to.deep.equal(jsonResponse);
      });
    });

    it('closeSharedbox fail JsonClient test', () => {
      var jsonResponse = {
        'result': false,
        'message': 'Unable to close the Sharedbox.'
      };

      stubOnCallError(jsonResponse);

      return jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4')
        .catch(error => {
          expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
          expect(Utils.fetch).to.have.been.calledWith(
            'https://endpoint.random.test/api/sharedboxes/dc6f21e0f02c41123b795e4/close',
            {headers: {'Authorization-Token':'token', 'Content-Type':'application/json'}, method : 'patch'}
          );
          expect(error.code).to.deep.equal(403);
          expect(error.message).to.deep.equal('Forbidden');
        });
    });
  });
});
