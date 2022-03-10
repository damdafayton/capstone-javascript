import './style.scss';
import {cryptoCount, getData, displayPage, createCoinsList} from './modules/Home';
import { request, requestInvolvement } from './modules/api';
import Comments from './modules/Comments';
import {addLikeListner,addLikesToList} from './modules/Likes';


const listCoinsContainer = document.querySelector('.coins');
const coinsCountContainer = document.querySelector('.cryptoCounter');
const paginationController = document.querySelectorAll('.page');




createCoinsList(request, listCoinsContainer, coinsCountContainer)
/*              
.then(()=>{ 
                    addLikesToList();   
                })
                .then(()=>  {addLikeListner();
                             
                });*/
displayPage(paginationController,request, listCoinsContainer, coinsCountContainer);
// var res=requestInvolvement.get(`comments?item_id=bitcoin`);
// res.then(response=>response.json()).then(result=>console.log(result));


