import "./NavComponenst.css"
import logo from "../resource/img/Icon-01-snake-old.webp"
import { BiLogOut } from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import React,{useEffect ,useState} from "react";

import { useSelector,useDispatch } from 'react-redux'
import { GetProvider  ,GetNetwork ,GetAddress} from '../redux/features/counter/WalletDataSlice'

import { changeNetwrok } from "./model/changeNetwrok";
import { metamaskEvent } from "./model/metamaskEvent";
import {logout} from "./model/getWallet"

import NetWrokData from "../Wallet/NetWrokData.json"
import LoginWindows from "./LoginWindows"

const NavComponenst = ()=>{
    const navigate =useNavigate()
    const [networkSelect ,setNetworkSelect] =useState("0x1")

    const netwrokOnchange=(e)=>{        
        setNetworkSelect(e.target.value)
        changeNetwrok(e.target.value ,dispatch,Provider)
    }

    //redux
    const dispatch = useDispatch()   
    const Address =useSelector(state => state.counter.Address)
    const IsLogin =useSelector(state => state.counter.IsLogin)
    const Provider = useSelector(state => state.counter.Provider)

    //PageClick
    const PageClick= (Url)=>{
        navigate("/"+Url);        
    }
     
    useEffect(()=>{
        //用戶自行變更行為
        metamaskEvent(dispatch,setNetworkSelect)       
        //getNetwork      
        dispatch(GetNetwork(networkSelect))
        
    },[])

    const [loginWindowsDisplay , setLoginWindowsDisplay ] =useState(false)
    const loginWindowsToggle = (e)=>{
        setLoginWindowsDisplay(e)
    }
 

    return(
        <>
            { loginWindowsDisplay && <LoginWindows loginWindowsToggle={loginWindowsToggle}/>}            
            <nav className="navContainer">
            <div className="nav-left">
                <div className="logo-container" onClick={() => {navigate("/");}}> 
                        <img src={logo} alt="log"></img>
                        <div>測試We3JS 跟 EthersJS</div>
                </div>
                <div className="item-container"> 
                        <ul>
                            <li onClick={() => {PageClick("Web3JS");}}>We3Js</li>
                            <li onClick={() => {PageClick("Ethers");}}>EthersJS</li>
                        </ul>
                </div>
            </div>
            <div className="nav-right">
            
                    <div className="netWrok-Container">
                        <select onChange={(e)=>{netwrokOnchange(e)}} value={networkSelect}>    
                            {Object.entries(NetWrokData).map(([key,value]) => {
                           
                                return(                                
                                    <option key={key} value={key}> {value.chainName} </option>
                                )
                                                      
                            })}
                        </select>
                    </div>
                    <div className="loginWellet-Container">
                        {IsLogin ? (
                            <div className="loginWellet-Address"> 
                                { Address!=null || Address!=undefined ?  Address.slice(0,5)+"...."+Address.slice(38):"" } 
                                <div className="myprofileList">
                                    <div className="myprofileList-item" onClick={()=>{logout(dispatch)}}>
                                        中斷連線  <BiLogOut style={{ fontSize: '20px' }}/>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <button onClick={async ()=>{loginWindowsToggle(true)}}> 與錢包連結 </button>
                        )}
                    </div>
                   
            </div>
            </nav>
        </>
       

      
    )
}


export default NavComponenst

