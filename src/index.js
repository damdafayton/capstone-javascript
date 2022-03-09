import './style.scss';
import { addToDom, cryptoCount, getData } from './modules/Home';
import { request } from './modules/api';
import addPopupClickHandlers from './modules/PopUp';

const coins = document.querySelector('.coins');

addToDom(request, coins)
  .then(() => { addPopupClickHandlers(); });
