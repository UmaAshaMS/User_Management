import  {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated : false,
    loading : false,
    error : false,
};

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers : {
        adminLoginStart : (state) => {
            state.loading = true;
            state.error = false;
        },
        adminLoginSuccess : (state) => {
            state.loading = false;
            state.isAuthenticated = true;
        },
        adminLoginFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        
        },
        adminLogout : (state) => {
            state.isAuthenticated = false;
            state.error = false;
        }
    }
});

export const {adminLoginStart, adminLoginSuccess, adminLoginFailure, adminLogout} = adminSlice.actions;
export default adminSlice.reducer;