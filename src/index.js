import './style.scss';
import { displayPage, createCoinsList } from './modules/Home';
import { request } from './modules/api';
import { addLikeListner } from './modules/Likes';
// import { addToDom, cryptoCount, getData } from './modules/Home';
import addPopupClickHandlers from './modules/PopUp';

const listCoinsContainer = document.querySelector('.coins');
const coinsCountContainer = document.querySelector('.cryptoCounter');
const paginationController = document.querySelectorAll('.page');

createCoinsList(request, listCoinsContainer, coinsCountContainer).then(() => {
  addLikeListner();
  addPopupClickHandlers();
});
/*
.then(()=>{
                    addLikesToList();
                })
                .then(()=>  {

                }); */
displayPage(paginationController, request, listCoinsContainer, coinsCountContainer);
// var res=requestInvolvement.get(`comments?item_id=bitcoin`);
// res.then(response=>response.json()).then(result=>console.log(result));

// addToDom(request, coins)
