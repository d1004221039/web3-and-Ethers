
import Web3 from 'web3';
import ERC20_ABI from"../../ABI/ERC20_ABI.json"

//參數合約地址、交易金額、取款人地址
export const tradeWeb3 = async ( _tokenAddress ,_transferAmount ,_recipientAddress , web3Provider)=>{
    
    const web3 = new Web3(web3Provider)  
    const accounts = await web3.eth.getAccounts();
    try {
        //**主幣交易**//
        if(_tokenAddress == "主幣"){
            const transactionObject= {
                from: accounts[0] ,
                to :_recipientAddress,
                value:web3.utils.toWei(_transferAmount, 'ether'),  
            }
             await web3.eth.sendTransaction(transactionObject)
            
        }else{
            //**ERC20交易**//
            //獲得合約跟瓦斯費            
            const getGasPrice = await web3.eth.getGasPrice()
            const tokenContract = await new web3.eth.Contract(ERC20_ABI,_tokenAddress,{
                gasPrice: getGasPrice.toString()
            });
            //取精度
            const decimals = parseInt(await tokenContract.methods.decimals().call())	
        
            // Convert ether to wei
            const transferAmountWei = web3.utils.toWei(_transferAmount, "ether");
                     
            let request = await tokenContract.methods.transfer(_recipientAddress,transferAmountWei)
            .send({
                from: accounts[0],
            })   
        }
    } catch (err) {
        console.error(err);
        alert("交易失敗");
    }

   
}
