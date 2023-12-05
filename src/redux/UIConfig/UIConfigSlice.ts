import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction } from '@radix-ui/react-direction';

interface UIConfigState {
  dir: Direction;
  lang: string;
  //   theme: Themes;
}

// const initialTheme = 'light';
const dir = localStorage.getItem('direction');
console.log('diiiir is ', dir);

const initialState: UIConfigState = {
  dir: dir,
  lang: 'en',
  //   theme: initialTheme,
};

export const uiConfigSlice = createSlice({
  name: 'uiConfig',
  initialState,
  reducers: {
    setDir: (state, action: PayloadAction<Direction>) => {
      state.dir = action.payload;
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { setDir, setLang } = uiConfigSlice.actions;

export default uiConfigSlice.reducer;
