import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isAuthenticated: false,
    loading: false,
    error: false,
    users: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLoginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        adminLoginSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = true;
        },
        adminLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.error = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        userUpdate: (state, action) => {
            const updatedUser = action.payload;
            state.users = state.users.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            
            // const index = state.users.findIndex(user => user._id === updatedUser._id);
            // if (index !== -1) {
            //     state.users[index] = updatedUser;
            // }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        }, 
        addUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        addUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});

export const { adminLoginStart,
    adminLoginSuccess,
    adminLoginFailure,
    adminLogout,
    userUpdate,
    setUsers,
    deleteUser,
    addUserStart,
    addUserFailure,
    addUserSuccess } = adminSlice.actions;
export default adminSlice.reducer;