import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  uid?: string;
  email?: string;
}

export const initialState: UserState = {
  uid: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleSetUserInfo(state: UserState, { payload: { uid, email } }) {
      state.uid = uid;
      state.email = email;
    },
  },
});

export const { handleSetUserInfo } = userSlice.actions;

export default userSlice.reducer;
