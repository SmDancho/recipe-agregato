import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export interface authState {
    user: null | string;
    token: null | string;
    isLoading: boolean;
    status: null | string;
}

const initialState: authState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const registerUser: any = createAsyncThunk(
    "authSlice/registerUser",
    async ({username, password}: any) => {
        try {
            const {data} = await axios.post(
                "http://localhost:5000/auth/registration",
                {
                    username,
                    password,
                }
            );
            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }
);

export const loginUser: any  = createAsyncThunk(
    "authSlice/loginUser",
    async ({username, password}: any) => {
        try {
            const {data} = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    username,
                    password,
                }
            );
            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }
);


export const getme: any = createAsyncThunk(
    "authSlice/getme",
    async (state:any) => {
        try {
            const {data} = await axios.get(
                "http://localhost:5000/auth/getme", {
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                    }
                }
            )
            return data;
        } catch (e) {
            console.log(e);
        }
    }
);


export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logout: (state) => {
            window.localStorage.removeItem("token")
            state.user = null
            state.token= null
            state.isLoading = false;
            state.status= null ;

        }

    },
    extraReducers: {
        //register
        [registerUser.pending]: (state) => {
            state.isLoading = true;

        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.status = action.payload.message;
            state.user = action.payload.user;
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message;
        },

        //login
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.status = action.payload.message;
            state.user = action.payload.user;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message;
        },
        //getme
        [getme.pending]: (state) => {
            state.isLoading = true;
        },
        [getme.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.status = null;
            state.user = action.payload.user;
        },
        [getme.rejected]: (state, action) => {
            state.status = action.payload.message;
        },
    },
});

export const checkIsAuth = (state:any) => Boolean(state.auth.token)
export const {logout} = authSlice.actions

export default authSlice.reducer;
