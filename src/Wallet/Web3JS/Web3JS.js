import "./Web3JS.css"
import CoinAddressData from "../CoinAddressData.json"
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux'
import {Web3GetCoinNumber} from "./model/Web3GetCoinNumber"
import {tradeWeb3} from "./model/Web3Exchagne"
import { GetProviderState } from "../../components/model/getWallet";
import {addERC20Coin} from "../../components/model/addERC20Coin"
import { IoAddCircleOutline  } from 'react-icons/io5';
const Web3JS = ()=>{
    const [balance, setBalance] =useState("0")  
    const [coinSelect, setCoinSelect] =useState("")
    const coinSelectChange=async (e)=>{          
        setCoinSelect(e.target.value)
        if(IsLogin){   
            const web3Provider = GetProviderState(Provider)
            setBalance(await Web3GetCoinNumber(Address , CoinAddressData[Network][e.target.value].address ,web3Provider ));               
        }
    }  
    const [sendAddress, setSendAddress] = useState("")
    const SendAddressChange= (e)=>{
        setSendAddress(e.target.value)
    }
    const [sendNum, setSendNum] = useState(0)
    const SendNumChange= (e)=>{
        setSendNum(e.target.value)
    }
    //redux
    const IsLogin = useSelector(state => state.counter.IsLogin)
    const Address = useSelector(state => state.counter.Address)
    const Network = useSelector(state => state.counter.Network)
    const Provider = useSelector(state => state.counter.Provider)
    useEffect( ()=>{
        async function getBalance(){            
            if(IsLogin){    
                const keys = Object.keys(CoinAddressData[Network]);                        
                const web3Provider = GetProviderState(Provider)
                setBalance(await Web3GetCoinNumber(Address , CoinAddressData[Network][keys[1]].address,web3Provider));                     
                setCoinSelect(keys[1])
            }
        }
        getBalance()
    },[IsLogin,Network])

    const clickTrade =()=>{ 
        const web3Provider = GetProviderState(Provider)
        tradeWeb3(CoinAddressData[Network][coinSelect].address, sendNum ,sendAddress ,web3Provider  )
        setSendAddress("0")
        setSendNum(0)
    }
    const clickCoinAdd = ()=>{   
        addERC20Coin(CoinAddressData[Network][coinSelect] , Provider)
    }
    return(
        <div className="Web3JS-conteainer">
            <h2>Web3JS串接</h2>
            <div className="tradeZone">
                <h3>貨幣轉帳</h3>
                <div className="coin-button-container">
                    <div >
                        <select value={coinSelect} onChange={(e)=>{coinSelectChange(e)}}>
                            {IsLogin && Object.entries(CoinAddressData[Network]).map(([key,value]) => {
                                if(key !=="chainName"){                             
                                    return(                                
                                        <option key={key} value={key}> {key} </option>
                                    )
                                }                            
                            })}
                        </select>
                        {Provider =="MetaMask" && (<IoAddCircleOutline  style={{fontSize:"25px",color:"#fff"}} onClick={clickCoinAdd}></IoAddCircleOutline >  )}  
                    </div>
                                     
                    <div>餘額：{balance.toString().slice(0,7)}</div>
                </div>
                
                <div className="trade-num-zone">
                    <input value={sendNum}  onChange={(e)=>{SendNumChange(e)}} type="number"/>
                    {/* <div className="Valuation">估值</div> */}
                </div>
                
                <div className="coin-button-container">
                    <button className="coin-button">移轉的帳戶</button>                 
                </div>
                
                <div className="trade-num-zone">
                    <input className="trade-address" value={sendAddress}  onChange={(e)=>{SendAddressChange(e)}} type="string"/>                    
                </div>
                {IsLogin ? (
                     <button className="trade-button cantrade" onClick={clickTrade}>交易</button>
                ):(
                    <button className="trade-button NotTrade" >請登入</button>
                )}
               
            </div>

            
        </div>
    )
}

export default Web3JS