import { GetNetwork } from "../../redux/features/counter/WalletDataSlice"
import NetWrokData  from"../../Wallet/NetWrokData.json"
import Web3 from "web3";


export const changeNetwrok= async(_network,dispatch,Provider)=>{   
    const Network = NetWrokData[_network]
    const chainId= Network.chainId =="0x1" && Provider=="Binance Wallet" ? "0x01":Network.chainId.toString()    
    try {
        console.log("chainId",chainId,"Provider",Provider)
        if(Provider == "MetaMask"){
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        }else{
            await window.BinanceChain.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    "chainId": chainId, // 56 in decimal
                    "chainName": Network.chainName,
                    "rpcUrls": [
                        Network.rpcUrls
                    ],
                    "nativeCurrency": {
                        "name": Network.name,
                        "symbol": Network.symbol,
                        "decimals": Network.decimals
                    },
                    // "blockExplorerUrls": [
                    //     "https://bscscan.com"
                    // ]
                }],
            })
        }       
        dispatch(GetNetwork(Network.chainId))
    } catch (switchError) {
        console.log(switchError)
        console.log(switchError.code)
        if (switchError.code == 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        "chainId": chainId,
                        "chainName": Network.chainName,
                        "rpcUrls": [Network.rpcUrls],
                            nativeCurrency: {
                                "name": Network.nativeCurrency.name,
                                "symbol": Network.nativeCurrency.symbol,
                                "decimals": parseInt(Network.nativeCurrency.decimals)
                            }
                        }],
                });
            } catch (addError) {

            }
        }

    }

}