import "./LoginWindows.css"
import MetamaskLogo from "../resource/img/MetaMask.png"
import BinanceLogo from "../resource/img/Binance Wallet.png"
import { useDispatch ,useSelector } from "react-redux"
import { GetProvider } from "../redux/features/counter/WalletDataSlice"
import { getWallet ,GetProviderState } from "./model/getWallet";
import Web3 from "web3"
const LoginWindows =({loginWindowsToggle,setNetworkSelect})=>{
    const wallet =[
        "MetaMask","Binance Wallet"
    ]
    const handleWalletSelect = (e) => {
        // 防止點擊事件冒泡到父層
        e.stopPropagation();
      };
    const dispatch =useDispatch()
    const network =useSelector(state =>state.counter.Network)
    // const Provider =useSelector(state =>state.counter.Provider)
    const walletSelectClick=(e)=>{ 
        dispatch(GetProvider(e))
        const Web3Provider =GetProviderState(e)   
        
        getWallet(dispatch,network,Web3Provider ,e ,setNetworkSelect)
        loginWindowsToggle(false)
    }
    return(
        <div className="LoginWindows-container" onClick={()=>{loginWindowsToggle(false)}}>
            <div className="LoginWindows" onClick={handleWalletSelect}>
                <h2>與錢包連線</h2>
                <p>首先，連線至下面的錢包之一。請務必妥善保管您的私人金鑰或助記詞，並且永遠不要與任何人分享。</p>
                <div className="wallet-select-container">
                    {wallet.map(element => {                    
                        return(
                            <button key={element} className="wallet-select" onClick={()=>{walletSelectClick(element)}}>
                                <img src={require(`../resource/img/${element}.png`)}/>
                                <div>{element}</div>
                            </button>
                        )
                    })}
                    
                    {/* <div className="wallet-select">
                        <img src={BinanceLogo}/>
                        <div>Binance Wallet</div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LoginWindows