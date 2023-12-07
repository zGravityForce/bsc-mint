const {Web3} = require('web3');
const web3 = new Web3('https://bsc-dataseed.binance.org/'); // connect Binance Smart Chain RPC
// const web3 = new Web3('https://bsc.publicnode.com'); // connect Binance Smart Chain RPC
	
// https://chainlist.org/

const address = '';
const privateKey = '';
const recipientAddress = address;



const sendBNBWithData = async (recipient, amount, hexData, nonce) => {
  const gasPrice = await web3.eth.getGasPrice(); // get current gas
  console.log('current gas:', gasPrice)

  const tx = {
    from: address,
    to: recipient,
    nonce: nonce,
    gas: 22000,
    gasPrice: gasPrice,
    value: web3.utils.toWei(amount, 'ether'),
    data: hexData,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return receipt;
};



const main = async () => {

    // Can be change
    const hexData = '0x646174613a2c7b2270223a226273632d3230222c226f70223a226d696e74222c227469636b223a2262736369222c22616d74223a2231303030227d'; // hex string
    let nonce = await web3.eth.getTransactionCount(address, 'latest'); // get last nonce
  


    const end = 1000; // set up a number which you wanted.

    for (let i = 0; i < end; i++) {
        console.log("nonce:", nonce);
        try {
          const receipt = await sendBNBWithData(recipientAddress, '0.0', hexData, nonce++);
          console.log(`Transaction ${i+1}:`, receipt);
        } catch (error) {
          nonce = await web3.eth.getTransactionCount(address, 'latest'); // get last nonce
          i--;
          console.error(`Error in transaction ${i+1}:`, error);
        }
      }
}


main();