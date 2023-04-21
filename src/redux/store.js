import { configureStore } from '@reduxjs/toolkit'
import WalletDataSlice from './features/counter/WalletDataSlice'

export default configureStore({
  reducer: {
    counter: WalletDataSlice
  }
})