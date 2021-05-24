import {
  combineReducers, configureStore, Reducer, ThunkAction,
} from '@reduxjs/toolkit';
import { Action, AnyAction, CombinedState } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { CONFIG } from '@constants/config.constants';
import { userSlice, UserState } from '@redux/user.redux';
import { modalSlice, ModalState } from '@redux/modal.redux';
import { socketDataSlice, SocketDataState } from '@redux/socket-data.redux';
import { useDispatch } from 'react-redux';

export interface AppState {
  user: UserState,
  modal: ModalState,
  socketData: SocketDataState,
}

const combinedReducers: Reducer<AppState> = combineReducers<AppState>({
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  socketData: socketDataSlice.reducer,
});

const reducer = (state: CombinedState<AppState> | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  }
  return combinedReducers(state, action);
};

const makeStore = () => configureStore({ reducer });

export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, { debug: CONFIG.REDUX_DEBUG });
