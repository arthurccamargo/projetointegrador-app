import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type NavigationItem = {
	id: string;
	title: string;
	url?: string;
	children?: NavigationItem[];
};

const initialState: NavigationItem[] = [];

// define o estado e as ações de navegação
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(_state, action: PayloadAction<NavigationItem[]>) {
			return action.payload;
		},
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;
export default navigationSlice;