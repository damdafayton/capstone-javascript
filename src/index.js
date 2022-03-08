import './style.scss';
import { addToDom, cryptoCount, getData } from './modules/Home';
import { request } from './modules/api';

const coins = document.querySelector('.coins');

addToDom(request, coins);


