import ERC20_ABI from "../../ABI/ERC20_ABI.json"
import Web3 from 'web3';
import { addERC20Coin } from "../../../components/model/addERC20Coin";

export const Web3GetCoinNumber = async(Address , coinAddress ,web3Provider )=>{
    const web3 = await new Web3(web3Provider)
    let restNumber =0
    try{
        if(coinAddress.length < 20){
            let balance = await web3.eth.getBalance(Address);
            restNumber = await web3.utils.fromWei(balance, "ether"); 
        }else{
            // get ERC20 balance
            const tokenAddress = coinAddress;
            const SRCContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
            const SRCbalanceBefore = await SRCContract.methods.balanceOf(Address).call()
            const SRCDecimals =await SRCContract.methods.decimals().call()   
            restNumber=SRCbalanceBefore/10**SRCDecimals
        }
    }catch(Error){
        // if (Error.message.startsWith('Internal JSON-RPC error.')) {
        //     const rpcError = JSON.parse(Error.message.slice(25));
        //     if(rpcError.code == -32000){
               
        //     }
        //   }
       
    }
   
    return restNumber
}

const initWeb3 =async ()=>{
    // const web3 = new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today");
   
    const web3 = await new Web3(Web3.givenProvider)
    let balance = await web3.eth.getBalance("0x3DD8F133C30cbc84B246f56cf8659B21595803a5");
    const maticBalance = web3.utils.fromWei(balance, "ether");
    // get ERC20 balance
    const tokenAddress = '0xcb1fb2538e236a047db0ed7a520b15022c55fa49';
    const SRCContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const SRCbalanceBefore = await SRCContract.methods.balanceOf('0x3DD8F133C30cbc84B246f56cf8659B21595803a5').call()
    const SRCDecimals =await SRCContract.methods.decimals().call()
    // setBalance({
    //     maticBalance,
    //     SRCbalance :SRCbalanceBefore/SRCDecimals
    // })       

    // console.log('maticBalance:', maticBalance , 'SRCbalance:', SRCbalanceBefore/SRCDecimals );
}