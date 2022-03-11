import './style.scss';
import { displayPage, createCoinsList, getData } from './modules/Home';
import { request } from './modules/api';
import { addLikesToList, addLikeListner } from './modules/Likes';
// import { addToDom, cryptoCount, getData } from './modules/Home';
import addPopupClickHandlers from './modules/PopUp';

const listCoinsContainer = document.querySelector('.coins');
const coinsCountContainer = document.querySelector('.cryptoCounter');
const paginationController = document.querySelectorAll('.page');

getData(request).then((result) => {
  createCoinsList(result, listCoinsContainer, coinsCountContainer);

  addLikesToList().then(() => {
    addLikeListner();
    addPopupClickHandlers();
  });
  displayPage(paginationController, result, listCoinsContainer, coinsCountContainer);
});
