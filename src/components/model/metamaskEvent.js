import { GetAddress ,GetNetwork} from "../../redux/features/counter/WalletDataSlice";
import { logout } from "./getWallet";
import Web3 from "web3";
  
export const metamaskEvent=(dispatch ,setNetworkSelect)=>{
    const web3 = new Web3(Web3.givenProvider)
    const web3Binance = new Web3(window.BinanceChain)
     //**用戶自行登出**//
     //MetaMask登出
     window.ethereum.on('accountsChanged', async () => {
        const Address = await web3.eth.getAccounts()            
        if(Address.length ===0){                
            logout(dispatch)
        }       
    });
    //幣安登出
    //disconnect
    window.BinanceChain.on("accountsChanged",async (accounts) => {
        // const Address = await web3Binance.eth.getAccounts()      
        console.log("accounts????",accounts)      
        // if(Address.length ===0){                
        //     dispatch(GetAddress({
        //         IsLogin : false,
        //         Address:""
        //     }))
        // }       
      });

    //**用戶自行更換Network**//
    //MetaMask換鍊
    window.ethereum.on('chainChanged', (chainId) => {
        setNetworkSelect(chainId)
        dispatch(GetNetwork(chainId))
      });

    //幣安換鍊
    window.BinanceChain.on("chainChanged", (chainId) => {
      
        chainId = chainId=="0x01" ? "0x1":chainId
        setNetworkSelect(chainId)
        dispatch(GetNetwork(chainId))
    });
}