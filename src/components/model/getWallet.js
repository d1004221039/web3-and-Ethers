import Web3 from "web3";
import { GetAddress, GetProvider ,GetNetwork } from "../../redux/features/counter/WalletDataSlice";
import { changeNetwrok } from "./changeNetwrok";
import { useSelector } from "react-redux";


// login
export const getWallet=async (dispatch,networkSelect,webProvider ,Provider)=>{    
    const web3 = new Web3(webProvider)  
    try{
        const Address = await web3.eth.requestAccounts()              
     
        await changeNetwrok(networkSelect ,dispatch,Provider)
        await dispatch(GetAddress({
            IsLogin : true,
            Address:Address[0]
        }))        
        
    }
    catch(error){
        console.log(`拒絕登入${error}`);
    }
    
}
//取得Provider
export const GetProviderState=(e)=>{
    let Provider;
    switch(e){
        case "MetaMask":
            Provider = Web3.givenProvider            
            break
        case "Binance Wallet":
            Provider = window.BinanceChain
            break
    }
    return Provider
}

export const logout = (dispatch)=>{
    dispatch(GetNetwork("0x1"))
    dispatch(GetAddress({
        Address:"",
        IsLogin:false,
    }))
}