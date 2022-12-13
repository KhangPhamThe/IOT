import { userAPI } from "./../../pages/api/users/authenAPI";
import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";

// THUNK API
export const signIn = createAsyncThunk(
  "user/signIn",
  async (params: { email: string; password: string }, {rejectWithValue}) => {
    try {
        const rs = await userAPI.onLogin(params);    
        
        if (!rs?.err) {
            const { token, tokenType, expireTime } = rs;
            const accessToken = `${token}`;
            // Save access token to storage
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("expired_at", expireTime); // expired_at is a timestamp    
            return rs;    
        }
        return rejectWithValue(rs.err);
    } catch(err) {        
        return rejectWithValue(err);
    }
  }
);

export const createNewAccount = createAsyncThunk(
  "user/createNewAccount",
  async (params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarURL?: string | undefined;
    role: string;
  }) => {
    const rs = await userAPI.createNewAccount(params);
    console.log("rs", rs)
    return rs;
  }
);

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (params: {
      jwt: string
    }) => {
      const rs =  userAPI.getUserProfile(params);
      return rs;
    }
  );

export const onLogout = createAsyncThunk(
    "user/onLogout",
   async () => {
      userAPI.onLogOutAccount()
   }
);

export interface UserState {
    current: {
        email: string | null;
        password: string | null;
        firstName: string | null;
        lastName: string | null;
        avatarURL: string | null;
        role: "user" | "admin" | null;
    } | null

  listUsers: any,
  error : string | '',
}

const initialState: UserState = {
    current: null,
    listUsers: null ,
    error : ''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
        .addCase(signIn.rejected, (state, action:PayloadAction<any>) => {
            state.current =  null,            
            state.error = action.payload || "error when login";
        })
        .addCase(signIn.fulfilled, (state, action:PayloadAction<any>) => {
            state.current = action.payload || {};
            state.error = '';
        })

        .addCase(getUserProfile.rejected, (state, action:PayloadAction<any>) => {
            state.current =  null,            
            state.error = action.payload || "error when login";
        })
        .addCase(getUserProfile.fulfilled, (state, action:PayloadAction<any>) => {
            state.current = action.payload || null;
            state.error = '';
        })

        .addCase(onLogout.fulfilled, (state, action:PayloadAction<any>) => {
          state.current = null;
          state.listUsers = null;
          state.error = '';
      })
  }
});

const { reducer: userReducer } = userSlice;

// selection
export const selectCurrentUser = (state: UserState) => state.current

export default userReducer;