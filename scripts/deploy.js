const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "3:00AM IST",
      location: "Miami-Dade Arena - Miami, FL"
    },
    {
      name: "IPL 224",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "6:00PM IST",
      location: "Mumbai, India"
    },
    {
      name: "Anuv Jain Live",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "9:00PM IST",
      location: "Bangalore, India"
    },
    {
      name: "EPL Liverpool vs Chelsea",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM UTC",
      location: "Liverpool, England"
    },
    {
      name: "ETH Global Toronto",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Toronto, Canada"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});