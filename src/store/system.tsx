import { createSlice } from '@reduxjs/toolkit'
import { SystemParams } from 'src/context/types'

type SystemStore = {
  selectedSystem: SystemParams | null
}

const initialState: SystemStore = {
  selectedSystem: null,
}
const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    handleSelectSystem: (state, action) => {
      const value = action.payload
      state.selectedSystem = value
    },
  },
})

// ** export reducers
export default systemSlice.reducer

// ** export actions
export const { handleSelectSystem } = systemSlice.actions
