import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	is_admin: false,
	is_loggedIn: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.user = action.payload;
			state.is_loggedIn = true;
			return state;
		},
		signOut: state => {
			state.user = {};
			state.is_loggedIn = false;
			return state;
		},
		update: (state, action) => {
			state.user = action.payload;
			return state;
		},
	},
});

export default userSlice.reducer;
