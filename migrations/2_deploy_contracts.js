var Authentication = artifacts.require('Authentication');
var DaiPay = artifacts.require('DAIPay');

module.exports = function(deployer) {
  deployer.deploy(DaiPay,'0x1170533e2b679a5dc5038a0F6e525B4aFF04Ee04');
  deployer.deploy(Authentication);
};
