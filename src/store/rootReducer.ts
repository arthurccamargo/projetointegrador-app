import { combineSlices } from '@reduxjs/toolkit';
import apiService from './apiService';
import navigationSlice from './navigationSlice';
import { categoryApi } from '../app/api/CategoryApi'; // adicione o import


export type LazyLoadedSlices = object

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// junta esses reducers em um único reducer raiz
export const rootReducer = combineSlices(
	/**
	 * Static slices
	 */
	navigationSlice,
	/**
	 * Lazy loaded slices
	 */
	{
		[apiService.reducerPath]: apiService.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer
	}
).withLazyLoadedSlices<LazyLoadedSlices>();

export default rootReducer;
