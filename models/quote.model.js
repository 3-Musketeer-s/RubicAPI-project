class quoteModel {
    constructor(dstTokenAddress, dstTokenBlockchain, referrer, srcTokenAddress, srcTokenAmount, srcTokenBlockchain) {
        this.dstTokenAddress = dstTokenAddress;
        this.dstTokenBlockchain = dstTokenBlockchain;
        this.referrer = referrer;
        this.srcTokenAddress = srcTokenAddress;
        this.srcTokenAmount = srcTokenAmount;
        this.srcTokenBlockchain = srcTokenBlockchain;
    }
}

module.exports = quoteModel;