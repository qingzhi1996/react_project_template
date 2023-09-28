import { store } from './index';

export interface State {
  spaceList: any,
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
