import {
  createSelector,
  createSlice, SliceCaseReducers,
} from '@reduxjs/toolkit';

export type SocketDataState = {
  title: string,
  description: string,
  price: number
};

const initialState: SocketDataState = {
  title: '',
  description: '',
  price: 0,
};

export const socketDataSlice = createSlice<SocketDataState, SliceCaseReducers<SocketDataState>>({
  name: 'socketData',
  initialState,
  reducers: {
    updateData(state: SocketDataState, action) {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.price = action.payload.price;
    },
  },
});

export const { updateData } = socketDataSlice.actions;

export const socketDataSelector = createSelector(
  (state: { socketData: SocketDataState }) => state.socketData,
  (socketData: SocketDataState) => ({
    title: socketData.title,
    description: socketData.description,
    price: socketData.price,
  }),
);
