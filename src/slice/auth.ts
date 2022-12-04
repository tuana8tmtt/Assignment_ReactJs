import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signup } from '../api/auth';
import { AuthType } from '../interfaces/auth';

export const signupApi = createAsyncThunk(
    'auth/signup',
    async (user) => {
        const data = await signup(user)
        return data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
    } as { isLogin: boolean },
    reducers: {
        login: (state) => {
            state.isLogin = !state.isLogin;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(signupApi.fulfilled, (state: any, action: PayloadAction) => {
            state.user = action.payload;
        })
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer