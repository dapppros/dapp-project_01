const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Exchange', () => {
  let deployer, houseAccount, exchange

  const gasPercent = 1;

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    houseAccount = accounts[1]

    const Exchange = await ethers.getContractFactory('Exchange')
    exchange = await Exchange.deploy(houseAccount.address, gasPercent)
  })

  describe('Deployment', () => {

    it('tracks the house account', async () => {
      expect(await exchange.houseAccount()).to.equal(houseAccount.address)
    })

    it('tracks the gas percent', async () => {
      expect(await exchange.gasPercent()).to.equal(gasPercent)
    })
  })
})
