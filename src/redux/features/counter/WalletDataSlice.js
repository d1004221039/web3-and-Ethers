import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'
export const WalletDataSlice = createSlice({
  name: 'WalletData',
  initialState: { 
    Provider:"",
    Address:"",
    IsLogin:false,
    Network:"",
    
  },
  reducers: {
    GetProvider:(state, action)=>{      
      state.Provider =action.payload
    },
    GetAddress:(state, action)=>{
      state.Address =action.payload.Address
      state.IsLogin =action.payload.IsLogin
    },
    GetNetwork:(state, action)=>{
      state.Network =action.payload  
    },
    
    
  }
})
 
// Action creators are generated for each case reducer function
export const { GetProvider ,GetAddress,GetNetwork} = WalletDataSlice.actions
 
export default WalletDataSlice.reducer