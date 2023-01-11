import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth, IStatusAuthInfo } from "../../typeinterfaces/types";

const initialState: IUserAuth & IStatusAuthInfo = {
  token: { access: "", refresh: "" },
  userinfo: { username: "", first_name: "", userId: "" },
  authLogInfo: { status: "default", payloadInfo: "" },
  isAuth: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authUserToken: (state, action: PayloadAction<IUserAuth>) => {
      console.log(action.payload.userinfo);
      state.isAuth = true;
      state.token = action.payload.token;
      state.userinfo = action.payload.userinfo;
    },
    logOut: () => initialState,
    statusAuth: (state, action: PayloadAction<IStatusAuthInfo>) => {
      state.authLogInfo = action.payload.authLogInfo;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      if (state.token) {
        state.token.access = action.payload;
      }
    },
  },
});

export const { authUserToken, logOut, statusAuth, updateToken } =
  authSlice.actions;
export default authSlice;
