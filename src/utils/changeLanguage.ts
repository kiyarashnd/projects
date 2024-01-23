import store from '../redux/configureStore';
import { uiConfigSlice } from '../redux/UIConfig/UIConfigSlice';

type TDirections = 'ltr' | 'rtl';

export const changeLanguage = (dir: TDirections) => {
  //we want to update the state dir :
  store.dispatch(uiConfigSlice.actions.setDir(dir));
  localStorage.setItem('direction', JSON.parse(JSON.stringify(dir)));

  if (dir === 'ltr') {
    store.dispatch(uiConfigSlice.actions.setLang('en'));
    localStorage.setItem('lang', JSON.parse(JSON.stringify('en')));
  } else if (dir === 'rtl') {
    store.dispatch(uiConfigSlice.actions.setLang('fa'));
    localStorage.setItem('lang', JSON.parse(JSON.stringify('fa')));
  }

  // const body = document.body;
  // body?.setAttribute('dir', dir);
};
