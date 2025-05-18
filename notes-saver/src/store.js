import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'

// The reducer field in configureStore expects an object, where each key is a slice of state and each value is a reducer function.This is valid ✅:
// reducer: {
//   paste: pasteReducer
// }
// But this ❌: reducer: pasteReducer
// ...is only valid if your app has just one reducer and it’s already a combined reducer (like from combineReducers()), which isn’t the case here.

export const store = configureStore({
  reducer: {
    paste: pasteReducer // 👈 'paste' becomes state.paste
  },
})    