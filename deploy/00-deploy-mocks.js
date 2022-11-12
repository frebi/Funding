const { network } = require("hardhat")

/*
INITIAL_ANSWER represents the starting value of the priceFeed i.e. the value of 1 ETH in USD. 
You can basically put any value you want not necessarily 2000. 
Since we are working locally, the only thing we are concerned about is if the priceFeed is working, not if it gives us the correct value of 1 ETH in USD.

The DECIMALS is a predefined value for the AggregatorV3Interface contract 
which describes the number of decimals we need to add to our INITIAL_ANSWER for it to be represented correctly and it is 8. 
You can look it up at https://rinkeby.etherscan.io/address/0x8A753747A1Fa494EC906cE90E9f37563A8AF630e#readContract on etherscan 
where the actual contract is hosted. If you read no 3 (decimals) you'll find the value of 8 there.
*/
const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000 USD (2000 + 00000000)

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks Deployed!")
        log("------------------------------------------------")
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
        log(
            "Please run `npx hardhat console` to interact with the deployed smart contracts!"
        )
        log("------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]