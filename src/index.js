import './style.scss';
import { addToDom , cryptoCount, getData} from './modules/Home';
import { request } from './modules/api';

const listCoinsContainer = document.querySelector('.coins');
const coinsCountContainer = document.querySelector('.cryptoCounter');


addToDom(request, listCoinsContainer, coinsCountContainer);


