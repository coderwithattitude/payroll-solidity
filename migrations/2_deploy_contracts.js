var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");
var DaiPay = artifacts.require("daipay");

module.exports = function(deployer) {
  deployer.deploy(DaiPay,"0x1170533e2b679a5dc5038a0F6e525B4aFF04Ee04");
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
};
