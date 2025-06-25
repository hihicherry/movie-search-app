import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'purple' | 'blue';
}

const initialState: ThemeState = {
  theme: (localStorage.getItem('theme') as 'purple' | 'blue') || 'purple',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'purple' ? 'blue' : 'purple';
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.remove('theme-purple', 'theme-blue');
      document.documentElement.classList.add(`theme-${state.theme}`);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
