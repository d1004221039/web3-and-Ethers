import "../Web3JS/Web3JS.css"
import CoinAddressData from "../CoinAddressData.json"
import {useState,useEffect} from "react";
import { useSelector } from 'react-redux'
import {addERC20Coin} from "../../components/model/addERC20Coin"
import { IoAddCircleOutline  } from 'react-icons/io5';
import { GetProviderState } from "../../components/model/getWallet";
import { EtherJSGetCoinNumber } from "./model/EtherJSGetCoinNumber";
import { tradeEthers } from "./model/EtherJSExchange";
import ERC20_ABI from"../ABI/ERC20_ABI.json"
import { ethers } from "ethers";

// const {ethers} = require("ethers")
const Ethers =()=>{
    const [balance, setBalance] =useState("0")  
    const [coinSelect, setCoinSelect] =useState("")
    const coinSelectChange=async (e)=>{          
        setCoinSelect(e.target.value)
        if(IsLogin){ 
            const web3Provider = GetProviderState(Provider)
            setBalance(await EtherJSGetCoinNumber(Address , CoinAddressData[Network][e.target.value].address ,web3Provider )); 
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

    // const [selectedAddress ,setSelectedAddress ] =useState({
    //     Address:""
    // })
    // const connectToMetamask =async () =>{
    //       const provider = new ethers.providers.Web3Provider(window.ethereum)
    //       const accounts = await provider.send("eth_requestAccounts", []);
    //       const balance = await provider.getBalance(accounts[0]);   
    //       const balanceInEther = ethers.utils.formatEther(balance)
    //       const block = await provider.getBlockNumber();

    //     //   setSelectedAddress({Address:accounts[0] ,balance: balanceInEther, block} )
          
    //       const daiContract = new ethers.Contract('0xcb1fb2538e236a047db0ed7a520b15022c55fa49', ERC20_ABI, provider);
    //       const tokenName = await daiContract.name();
    //       const tokenBalance = await daiContract.balanceOf(accounts[0]);
    //       const tokenUnits = await daiContract.decimals();
    //       const tokenBalanceInEther = ethers.utils.formatUnits(tokenBalance, tokenUnits);
      
    //       setSelectedAddress({ selectedAddress: accounts[0], balance: balanceInEther, block, tokenName, tokenBalanceInEther })
    //   }
    // const trade= async (to, amountInEther)=>{
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner()
    //    
    //     const daiContract = new ethers.Contract('0xcb1fb2538e236a047db0ed7a520b15022c55fa49', ERC20_ABI, provider);

    //     const tokenUnits = await daiContract.decimals();
    //     const tokenAmountInEther = ethers.utils.parseUnits(amountInEther, tokenUnits);

    //     const daiContractWithSigner = daiContract.connect(signer);
    //     console.log("daiContractWithSigner",daiContractWithSigner)
    //     daiContractWithSigner.transfer(to, tokenAmountInEther);
    //     console.log(daiContractWithSigner)
    // } 
    useEffect( ()=>{
        async function getBalance(){            
            if(IsLogin){    
                const keys = Object.keys(CoinAddressData[Network]);                        
                const web3Provider = GetProviderState(Provider)
                setBalance(await EtherJSGetCoinNumber(Address , CoinAddressData[Network][keys[1]].address,web3Provider));                     
                setCoinSelect(keys[1])
            }
        }
        getBalance()
    },[IsLogin,Network])
    const clickTrade =()=>{ 
        const web3Provider = GetProviderState(Provider)
        tradeEthers(CoinAddressData[Network][coinSelect].address, sendNum ,sendAddress ,web3Provider  )
        setSendAddress("0")
        setSendNum(0)
    }
    const clickCoinAdd = ()=>{   
        addERC20Coin(CoinAddressData[Network][coinSelect], Provider)
    }
    return(
        <>
<div className="Web3JS-conteainer">
            <h2>Ethers串接</h2>
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
        </>
    )
}
export default Ethers