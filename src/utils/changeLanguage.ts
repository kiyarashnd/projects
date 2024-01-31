import store from '../redux/configureStore';
import { uiConfigSlice } from '../redux/UIConfig/UIConfigSlice';

type TDirections = 'ltr' | 'rtl';

export const changeLanguage = (dir: TDirections) => {
  //we want to update the state dir :
  store.dispatch(uiConfigSlice.actions.setDir(dir));
  if (typeof window !== 'undefined') {
    localStorage.setItem('direction', JSON.parse(JSON.stringify(dir)));
  }

  if (dir === 'ltr') {
    store.dispatch(uiConfigSlice.actions.setLang('en'));
  } else if (dir === 'rtl') {
    store.dispatch(uiConfigSlice.actions.setLang('fa'));
  }
};
