async function main() {
  console.log(`Preparing deployment...\n`)

  // Fetch contract to deploy
  const Token = await ethers.getContractFactory('Token')
  const Exchange = await ethers.getContractFactory('Exchange')

  // Fetch accounts
  const accounts = await ethers.getSigners()
  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  // Deploy contracts
  const ash = await Token.deploy('Ashlandia', 'ASH', '1000000')
  await ash.deployed()
  console.log(`ASH Deployed to: ${ash.address}`)

  const isa = await Token.deploy('ISA Token', 'ISA', '1000000')
  await isa.deployed()
  console.log(`ISA Deployed to: ${isa.address}`)

  const zdoge = await Token.deploy('zDoge Coin', 'zDOGE', '1000000')
  await zdoge.deployed()
  console.log(`zDOGE Deployed to: ${zdoge.address}`)

  const exchange = await Exchange.deploy(accounts[1].address, 1)
  await exchange.deployed()
  console.log(`Exchange Deployed to: ${exchange.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
