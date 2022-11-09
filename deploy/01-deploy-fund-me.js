
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")

//hre => hardhat runtime environment
/*
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
}
*/
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log} = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeeAddress = ethUsdAggregator.address
    }else{
        ethUsdPriceFeeAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    //if the contract doesn't exist. we deploy a minimal version of it for our local testing

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeeAddress], // put pricefeed address
        log: true,
    })
    log("---------------------------------------------")
}

module.exports.tags = ["all", "fundme"]