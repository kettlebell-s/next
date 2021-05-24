import {
  createAsyncThunk, createSelector, createSlice, PayloadAction, SliceCaseReducers,
} from '@reduxjs/toolkit';
import { UserDTO } from '@dtos/user.dto';
// import { apiUsersGetMe } from '@services/api/users.api';
import { apiAuthLogout } from '@services/api/auth.api';
import { apolloClient } from '@helpers/apollo.helper';
import { GET_MEMBER_QUERY } from '@constants/graphql.constants';

export type UserState = UserDTO | null;

export const bindUser = createAsyncThunk('user/bindUser', async () => {
  const { data } = await apolloClient.query({
    query: GET_MEMBER_QUERY,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data.member;
});
export const logoutUser = createAsyncThunk('user/logoutUser', async () => apiAuthLogout());

const initialState: UserState = null;

export const userSlice = createSlice<UserDTO | null, SliceCaseReducers<UserDTO | null>>({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bindUser.fulfilled, (state, action: PayloadAction<UserDTO>) => {
      state = action.payload;
      return state;
    });
    builder.addCase(bindUser.rejected, (state) => {
      state = null;
      return state;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state = null;
      return state;
    });
  },
});

export const selectorUser = createSelector((state: { user: UserState }) => state.user, (user) => user);
