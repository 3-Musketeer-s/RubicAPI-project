class swapModel {
    constructor(
        dstTokenAddress, 
        dstTokenBlockchain, 
        referrer, 
        srcTokenAddress, 
        srcTokenAmount, 
        srcTokenBlockchain, 
        fromAddress, 
        id
    ) {
        this.dstTokenAddress = dstTokenAddress;
        this.dstTokenBlockchain = dstTokenBlockchain;
        this.referrer = referrer || 'rubic.exchange';  // Default referrer value
        this.srcTokenAddress = srcTokenAddress;
        this.srcTokenAmount = srcTokenAmount;
        this.srcTokenBlockchain = srcTokenBlockchain;
        this.fromAddress = fromAddress;
        this.id = id;
    }
}

module.exports = swapModel;