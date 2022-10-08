import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
	token: String;
	fname: String;
	lname: String;
	email: String;
	is_admin: Boolean;
}

const initialState: UserState = {
	token: '',
	fname: '',
	lname: '',
	email: '',
	is_admin: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;
