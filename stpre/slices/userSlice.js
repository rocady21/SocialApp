import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "message",
  initialState: {
    message: "XD"
  },
  reducers: {
    setMessage: (state,{payload})=> {
      state.message = payload
    }
}
})

export const { setMessage } = userSlice.actions
export default userSlice