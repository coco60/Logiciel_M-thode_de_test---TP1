import JsonClient from '../src/modules/JsonClient.js';
import sinon from 'sinon';
import * as Utils from '../src/Utils/platform.js';
let assert = require('chai').assert;

let jsonClient;

beforeEach(() => {
  jsonClient = new JsonClient(0,0,0);
});

it('initializeSharedBox JsonClient test', () => {
  var stub = sinon.stub(Utils,'fetch').throws();
  stub.resolves({status:200,statusText:'OK',ok:true,text:function(){return 'coucou';},json:function(){return 'json info';}});
  var answer = jsonClient.initializeSharedBox('mail');
  assert.isNull(answer);
});
