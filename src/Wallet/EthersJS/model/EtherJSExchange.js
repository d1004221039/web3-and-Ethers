import { ethers } from "ethers"
import ERC20_ABI from"../../ABI/ERC20_ABI.json"

export const tradeEthers = async (_tokenAddress ,_transferAmount ,_recipientAddress , web3Provider)=>{
    const web3 = new ethers.providers.Web3Provider(web3Provider)
    const accounts = await web3.send("eth_requestAccounts", []);
    const signer = web3.getSigner() //獲得簽名
    try{
        //**主幣交易**//
        if(_tokenAddress == "主幣"){
            const transactionObject= {           
                to :_recipientAddress,
                value:ethers.utils.parseEther(_transferAmount),  
            }
    
            const signedTx = await signer.sendTransaction(transactionObject);
        }else{
            //**ERC20交易**//
            //獲得合約
            const tokenContract = new ethers.Contract(_tokenAddress, ERC20_ABI, web3);
            const decimals = await tokenContract.decimals();
            const transferAmountWei = ethers.utils.parseUnits(_transferAmount, decimals);
            const daiContractWithSigner = tokenContract.connect(signer);          
            daiContractWithSigner.transfer(_recipientAddress, transferAmountWei);
            
        }
    }catch(error){
        console.error(error);
        alert("交易失敗");
    }
   
}