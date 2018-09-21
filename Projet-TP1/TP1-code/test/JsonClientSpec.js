import JsonClient from '../src/modules/JsonClient.js';
// import SharedBox from '../src/sharedbox.js';
import * as Utils from '../src/Utils/platform.js';
// import Blob from 'node-fetch';
let chai = require('chai');
// let expect = require('chai').expect;
let sinon = require('sinon');
let expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

let Response = Utils.fetch.Response;
let jsonClient;

let fakePromise = function(promiseHelper){
  return new Promise((resolve, reject) => {
    promiseHelper(resolve,reject);
  });
};

function stubOnCall(jsonResponse){
  var stub = sinon.stub(Utils,'fetch');
  // var init = { ok : 200, text: function(){return 'test not null';},json : function(){return jsonResponse;}};

  stub.onFirstCall().returns(fakePromise(r => r(new Response(JSON.stringify('https://endpoint.random.test/')))));
  stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(jsonResponse)))));
}

beforeEach(() => {
  jsonClient = new JsonClient('token',0,'https://endpoint.random.test');
});

// it('initializeSharedBox JsonClient test', () => {
//
//   //let reponse = new Response(stubCall());
//   var jsonResponse = {
//     guid: 'dc6f21e0f02c41123b795e4',
//     uploadUrl: 'https://endpoint.random.test/'
//   };
//
//   stubOnCall(jsonResponse);
//
//   return jsonClient.initializeSharedBox('darth.vader@email.com').then(result => {
//     expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
//     expect(Utils.fetch).to.have.been.calledWith(
//       'https://endpoint.random.test/api/sharedboxes/new?email=darth.vader@email.com',
//       { headers: {'Authorization-Token':'token'}, method : 'get'}
//     );
//     // expect(result).to.be.not.null;
//     expect(result.guid).to.equal('dc6f21e0f02c41123b795e4');
//   });
//   // sinon.restore();
// });

it('submitSharedBox JsonClient test', () => {
  // let reponse = new Response(stubOnCall());
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

  return jsonClient.initializeSharedBox('darth.vader@email.com').then(result => {
    expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url');
    expect(Utils.fetch).to.have.been.calledWith(
      'https://endpoint.random.test/api/sharedboxes',
      { body:jsonResponse, headers: {'Authorization-Token':'token', 'content-Type':'application/json'}, method : 'get'}
    );
    // expect(result).to.be.not.null;
    expect(result.guid).to.equal('1c820789a50747df8746aa5d71922a3f');
  });
});
