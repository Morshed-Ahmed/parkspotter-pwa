import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  redirectedFlag: true,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => initialState,
    setRedirectedFlag: (state, action) => {
      state.redirectedFlag = action.payload
    },
  },
})

export const { setUser, clearUser, setRedirectedFlag } = userSlice.actions

export const selectUser = (state) => state.user
export const selectUsername = (state) => state.user.username
export const selectEmail = (state) => state.user.email
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectPhoneNumber = (state) => state.user.phoneNumber
export const selectRedirectedFlag = (state) => state.user.redirectedFlag

export default userSlice.reducer
