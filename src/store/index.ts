import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { initialState } from './constants';
import { AppDispatch, RootState } from './interfaces';

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setSpaceList(state, action) {
      state.spaceList = action.payload;
    }
  }
});

export const {
  setSpaceList
} = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector((state: RootState): RootState => state);
