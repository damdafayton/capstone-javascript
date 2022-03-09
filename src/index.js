import './style.scss';
import { addToDom, cryptoCount, getData } from './modules/Home';
import { request } from './modules/api';
import { addClickHandlers } from './modules/popup';

const coins = document.querySelector('.coins');

addToDom(request, coins)
    .then(() => { addClickHandlers() })


