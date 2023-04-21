//不用錢包的範例
import Web3 from 'web3';
import ERC20_ABI from"../Wallet/ABI/ERC20_ABI.json"
import { useState } from 'react';
const Web3JsNoWallet = ()=>{
    const [balance, setBalance] =useState({
        maticBalance:0,
        SRCbalance:0,        
    })
    const initWeb3 =async ()=>{
        // const web3 = new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today");
        const web3 = await new Web3(Web3.givenProvider)
     
        // const web3 = new Web3("https://rpc-mumbai.maticvigil.com/");
        let balance = await web3.eth.getBalance("0x3DD8F133C30cbc84B246f56cf8659B21595803a5");
        const maticBalance = web3.utils.fromWei(balance, "ether");
        // get ERC20 balance
        const tokenAddress = '0xcb1fb2538e236a047db0ed7a520b15022c55fa49';
        const SRCContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        const SRCbalanceBefore = await SRCContract.methods.balanceOf('0x3DD8F133C30cbc84B246f56cf8659B21595803a5').call()
        const SRCDecimals =await SRCContract.methods.decimals().call()
        setBalance({
            maticBalance,
            SRCbalance :SRCbalanceBefore/SRCDecimals
        })       

        console.log('maticBalance:', maticBalance , 'SRCbalance:', SRCbalanceBefore/SRCDecimals );
    }

    const tradeWeb3 = async ()=>{
        const web3 = new Web3("https://rpc-mumbai.maticvigil.com/");
        
        const privateKey = "ba09a1506c59ee09d825e49fc50e5b31857f07b9ba7884dc75fdd82be6a9b85f";
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        const tokenAddress = '0xcb1fb2538e236a047db0ed7a520b15022c55fa49';
        const SRCContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        const recipientAddress = '0x3D7244CF27B291ac9b107a43fD09C09fA25f25F9';

        // The amount to transfer in ether
        const transferAmount = '11';

        // Convert ether to wei
        const transferAmountWei = web3.utils.toWei(transferAmount, 'ether');

        //交易
        const currentNonce = await web3.eth.getTransactionCount(account.address);
        const gasPrice = await web3.eth.getGasPrice();

        const txParams = {
            from: account.address,
            to: tokenAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(80000),
            nonce: web3.utils.toHex(currentNonce),
            value: '0x0',
            data: SRCContract.methods.transfer(recipientAddress, transferAmountWei).encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Transaction Hash:', txReceipt.transactionHash);
    }

   
    return(
        <>
            <h2>Web3JS串接</h2>
            <div>
                {balance.maticBalance ===0 ? 
                    ( <button onClick={initWeb3}> 執行取得基本資料 </button>)
                    :
                    (
                        <>
                            <p>maticBalance:{balance.maticBalance}</p>
                            <p>SRCbalance:{balance.SRCbalance}</p>
                        </>                        
                    )
                }
                <button onClick={tradeWeb3}>交易</button>
            </div>
        </>
    )
}

export default Web3JsNoWallet