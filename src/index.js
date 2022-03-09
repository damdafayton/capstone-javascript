import './style.scss';
import { addToDom , cryptoCount, getData, displayPage} from './modules/Home';
import { request } from './modules/api';

const listCoinsContainer = document.querySelector('.coins');
const coinsCountContainer = document.querySelector('.cryptoCounter');
const paginationController = document.querySelectorAll('.page');

addToDom(request, listCoinsContainer, coinsCountContainer);
console.log('hallo',paginationController);
displayPage(paginationController,request, listCoinsContainer, coinsCountContainer);

