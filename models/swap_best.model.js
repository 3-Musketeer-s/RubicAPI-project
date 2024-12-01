class swapBestModel {
    constructor(
        srcTokenAddress, 
        srcTokenBlockchain, 
        dstTokenBlockchain, 
        dstTokenAddress, 
        srcTokenAmount, 
        id, 
        enableChecks = true, 
        fromAddress, 
        receiver, 
        signature, 
        integratorAddress, 
        slippage = 0.02, 
        preferredProvider = 'symbiosis', 
        timeout = 32, 
        enableTestnets = false, 
        referrer = 'rubic.exchange', 
        showFailedRoutes = false,
        nativeBlacklist = [],
        foreignBlacklist = {}
    ) {
        this.srcTokenAddress = srcTokenAddress;
        this.srcTokenBlockchain = srcTokenBlockchain;
        this.dstTokenBlockchain = dstTokenBlockchain;
        this.dstTokenAddress = dstTokenAddress;
        this.srcTokenAmount = srcTokenAmount;
        this.id = id;
        this.enableChecks = enableChecks;
        this.fromAddress = fromAddress;
        this.receiver = receiver;
        this.signature = signature;
        this.integratorAddress = integratorAddress;
        this.slippage = slippage;
        this.preferredProvider = preferredProvider;
        this.timeout = timeout;
        this.enableTestnets = enableTestnets;
        this.referrer = referrer;
        this.showFailedRoutes = showFailedRoutes;
        this.nativeBlacklist = nativeBlacklist;
        this.foreignBlacklist = foreignBlacklist;
    }
}

module.exports = swapBestModel;
