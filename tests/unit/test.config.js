const chaiAsPromised = require('chai-as-promised');

global.chai = require('chai');
global.expect = global.chai.expect;
global.chai.use(chaiAsPromised);
global.createSandbox = require('sinon').createSandbox;
