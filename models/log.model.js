class logModel {
    constructor(
      srcTokenAddress,
      srcTokenAddressName,
      srcTokenAmount,
      srcTokenBlockchain,
      dstTokenAddress,
      dstTokenAddressName,
      dstTokenBlockchain,
      fromAddress,
      quoteId,
      transactionHash
    ) {
      this.srcTokenAddress = srcTokenAddress;
      this.srcTokenAddressName = srcTokenAddressName;
      this.srcTokenAmount = srcTokenAmount;
      this.srcTokenBlockchain = srcTokenBlockchain;
      this.dstTokenAddress = dstTokenAddress;
      this.dstTokenAddressName = dstTokenAddressName;
      this.dstTokenBlockchain = dstTokenBlockchain;
      this.fromAddress = fromAddress;
      this.quoteId = quoteId;
      this.transactionHash = transactionHash;
    }
}

module.exports = logModel;