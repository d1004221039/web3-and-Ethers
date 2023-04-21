
import './App.css';
import Ethers from "./Wallet/EthersJS/EthersJS"
import Web3JS from './Wallet/Web3JS/Web3JS';
import NavComponenst from './components/NavComponenst';
import { Routes, Route,useNavigate } from "react-router-dom";

import {  useDispatch } from 'react-redux'
import { GetProvider } from './redux/features/counter/WalletDataSlice'

function App() {
  return (
    <>
        <NavComponenst />
        <div className='App'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="Ethers" element={<Ethers />} />    
            <Route path="Web3JS" element={<Web3JS />}/>
          </Routes>
        </div>    
    </>
  );
}
const Main =()=>{
  //router
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch()
  //buttonClick
  const buttonClick= (Url)=>{
    navigate("/"+Url);   
  }
  return(
    <div className='main'>
      <h2>首頁</h2>     
      <div>
        <button onClick={() => {buttonClick("Web3JS");}}> Web3JS</button>
        <button onClick={() => {buttonClick("Ethers");}}> EthersJS</button>
      </div>
    </div>
  )
}

export default App;

