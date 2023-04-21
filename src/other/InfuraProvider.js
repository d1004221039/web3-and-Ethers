
//串接InfuraProvider 範例!!

import React,{useState} from "react";
import ERC20_ABI from"../Wallet/ABI/ERC20_ABI.json"
import  {ethers}  from "ethers";

const InfuraProviderComponents =({isabc})=>{
    
    const [selectedAddress ,setSelectedAddress ] =useState({
        Address:""
    })
    const connectToMetamask =async () =>{   
           const provider = new ethers.providers.InfuraProvider('maticmum', '2ODUVKIcKUf82uWtxP9Aa0EoWID')  

           const privateKey = 'ba09a1506c59ee09d825e49fc50e5b31857f07b9ba7884dc75fdd82be6a9b85f';
           const wallet = new ethers.Wallet(privateKey, provider);
          
           const contractAddress = '0xcb1fb2538e236a047db0ed7a520b15022c55fa49'; // 合約地址   
           const contract = new ethers.Contract(contractAddress, ERC20_ABI, wallet);
           const tokenName = await contract.name();
           const tokenBalance = await contract.balanceOf(wallet.address);
           const tokenUnits = await contract.decimals();
           const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits);
          
           setSelectedAddress({ Address: wallet.address, tokenName,SRCbalance: tokenBalanceInEther  })
           console.log(await provider.getNetwork())
      }
    const trade= async (to, amountInEther)=>{
        const provider = new ethers.providers.InfuraProvider('maticmum', {
            projectId: "fe0845100fe044309cf1f46a1755e684",
            projectSecret: "251c816dcac44dad99d3820c8b7a32b5"
          })  
        const privateKey = 'ba09a1506c59ee09d825e49fc50e5b31857f07b9ba7884dc75fdd82be6a9b85f';
        const wallet = new ethers.Wallet(privateKey, provider);
        const signer = wallet.connect(provider);
        const daiContract = new ethers.Contract('0xcb1fb2538e236a047db0ed7a520b15022c55fa49', ERC20_ABI, signer);
        
        const tokenUnits = await daiContract.decimals();      
        const amount = ethers.utils.parseUnits(amountInEther, tokenUnits);
        // const tx = await daiContract.transfer(to, amount);
        // const receipt = await tx.wait();
        // console.log("receipt", receipt);

        // const tx = await daiContract.transfer(to, amountInEther);
        // const signedTx = await wallet.signTransaction(tx);
        // const txReceipt = await provider.sendTransaction(signedTx);
        // console.log(`Transaction hash: ${txReceipt.hash}`);


        //  const tokenUnits = await daiContract.decimals();
        //  const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits);

        //  const daiContractWithSigner = daiContract.connect(signer);
        //  daiContractWithSigner.transfer(to, tokenAmountInEther);
    } 
    return(
        <>
            {/* <p>{selectedAddress.Address}</p> */}
            {selectedAddress.Address == "" ?(
                 <button onClick={connectToMetamask}>Connect to Metamask</button>
            ) :(
                <>
                    <p>Welcome {selectedAddress.Address}</p>        
                    <p>tokenName : {selectedAddress.tokenName}</p> 
                    <p>SRCbalance : {selectedAddress.SRCbalance}</p>      
                  
                </>
               
            )}
             <button onClick={()=>{trade("0x3D7244CF27B291ac9b107a43fD09C09fA25f25F9","1" )}}> 交易 </button>
        </>
    )
}
export default InfuraProviderComponents