const buySell = artifacts.require("buySell");

module.exports = function (deployer) {
  deployer.deploy(buySell);
};
