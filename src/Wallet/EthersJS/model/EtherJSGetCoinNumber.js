import ERC20_ABI from "../../ABI/ERC20_ABI.json"
import { ethers } from "ethers";

export const EtherJSGetCoinNumber=async (Address , coinAddress ,web3Provider)=>{    
    const provider = new ethers.providers.Web3Provider(web3Provider)
    let restNumber =0
    try{
        if(coinAddress.length < 20){
            const balance = await provider.getBalance(Address);   
            restNumber = await ethers.utils.formatEther(balance);
        }else{
            // get ERC20 balance
            const tokenAddress = coinAddress;
            const SRCContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
            const SRCbalanceBefore = await SRCContract.balanceOf(Address);
            const SRCDecimals =await SRCContract.decimals();
            restNumber=SRCbalanceBefore/10**SRCDecimals
        }
    }
    catch(Error){

    }
    return restNumber
}