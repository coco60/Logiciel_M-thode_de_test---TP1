import JsonClient from '../src/modules/JsonClient.js';
// import SharedBox from '../src/sharedbox.js';
import * as Utils from '../src/Utils/platform.js';
import Response from 'node-fetch';
// import Blob from 'node-fetch';
// let assert = require('chai').assert;
let expect = require('chai').expect;
let sinon = require('sinon');

let jsonClient;

let fakePromise = function(promiseHelper){
  return new Promise((resolve, reject) => {
    promiseHelper(resolve,reject);
  });
};

function stubOnCall(jsonResponse){
  var stub = sinon.stub(Utils,'fetch');
  // var init = { ok : 200, text: function(){return 'test not null';},json : function(){return jsonResponse;}};

  stub.onFirstCall().returns(fakePromise(r => r(new Response('https://endpoint.random.test/'))));
  stub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(jsonResponse)))));
}

beforeEach(() => {
  jsonClient = new JsonClient('token',0,'https://endpoint.random.test/');
});

it('initializeSharedBox JsonClient test', () => {

  //let reponse = new Response(stubCall());
  var jsonResponse = {
    guid: 'dc6f21e0f02c41123b795e4',
    uploadUrl: 'upload_url'
  };
  stubOnCall(jsonResponse);

  return jsonClient.initializeSharedBox('darth.vader@email.com').then(result => {
    expect(Utils.fetch).to.have.been.calledWith('https://endpoint.random.test/services/sharedbox/server/url/');
    expect(Utils.fetch).to.have.been.calledWith(
      'https://endpoint.random.test/api/sharedboxes/new?email=darth.vader@email.com/',
      { headers: {'Authorization-Token':'token'}, method: 'get' }
    );
    // expect(result).to.be.not.null;
    expect(result.guid).to.be.equal;
  });
});
