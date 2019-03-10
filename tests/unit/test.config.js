const Vue = require('vue');
const chaiAsPromised = require('chai-as-promised');

Vue.config.productionTip = false;
Vue.config.devtools = false;

global.chai = require('chai');
global.expect = global.chai.expect;
global.chai.use(chaiAsPromised);
global.createSandbox = require('sinon').createSandbox;
