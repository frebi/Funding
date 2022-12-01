
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()

//hre => hardhat runtime environment
// getNamedAccounts and deployments come from hre
/*
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
}
*/
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeeAddress = ethUsdAggregator.address
    }else{
        ethUsdPriceFeeAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    //if the contract doesn't exist. we deploy a minimal version of it for our local testing

    const args = [ethUsdPriceFeeAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put pricefeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(fundMe.address, args)
    }

    log("---------------------------------------------")
}

module.exports.tags = ["all", "fundme"]