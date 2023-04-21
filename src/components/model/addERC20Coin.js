import Web3 from "web3";
import { Web3GetCoinNumber } from "../../Wallet/Web3JS/model/Web3GetCoinNumber";
export const addERC20Coin =async (coinData,Provider)=>{
    try{
        if(coinData.address !="主幣"){
            if(Provider =="MetaMask"){
                 await window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20', // Initially only supports ERC20, but eventually more!
                        options: {
                            address: coinData.address, // The address that the token is at.
                            symbol: coinData.symbol, // A ticker symbol or shorthand, up to 5 chars.
                            decimals: coinData.decimals, // The number of decimals in the token               
                        },
                    },
                });
            }else{
                //暫無這項功能
                // await window.BinanceChain.request({
                //     method: 'wallet_watchAsset',
                //     params: {
                //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
                //         options: {
                //             address: coinData.address, // The address that the token is at.
                //             symbol: coinData.symbol, // A ticker symbol or shorthand, up to 5 chars.
                //             decimals: coinData.decimals, // The number of decimals in the token               
                //         },
                //     },
                // });
            }
   
            
             
        }
    }catch(error){
        console.log(error)
    }
 
    
}