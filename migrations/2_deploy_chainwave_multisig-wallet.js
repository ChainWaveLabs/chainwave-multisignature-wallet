const ChainwaveMultiSigWallet = artifacts.require('ChainwaveMultiSigWallet');

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(
    ChainwaveMultiSigWallet,
    [accounts[0], accounts[1], accounts[2]],
    2
  ); // constructor
  const chainwaveWallet = await ChainwaveMultiSigWallet.deployed();
  console.log('wallet deployed');
  await web3.eth.sendTransaction({
    from: accounts[0],
    to: chainwaveWallet.address,
    value: 100000,
  });
};
