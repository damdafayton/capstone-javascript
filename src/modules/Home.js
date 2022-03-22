import { addLikesToList, addLikeListner } from './Likes';

import addPopupClickHandlers from './PopUp';
import { readableNumbers } from './PopUp';

export default function populateHome() {

}

const getData = async (request) => {
  const response = await request.get();
  const data = response.json();
  return data;
};
const cryptoCount = (array) => array.length;

const createCoinElement = (coin) => `
                <li class="d-flex">
                  <ul class="coin w-100 d-flex flex-column">
                      <li class="coinIcons"><img class="coinImage mx-1 my-1" src=${coin.image} alt='coin'/></li>
                      <li><strong>${coin.name} (${coin.symbol.toUpperCase()})</strong></li>
                      <span class="h-100"></span>
                      <li>$${readableNumbers(coin.current_price)}</li>
                      <li class="likeIcons my-2"><button id='likeBtn-${coin.id}' class="likeBtn" > <i class="fas fa-heart"></i><p class="my-1"></p></button></li>
                      <li id=${coin.id} class="commentAddIcon mb-1">Comments 
                          <i class="fas fa-comment-alt vertical-align-middle" ></i>
                      </li>
                   </ul>
                </li>`;

const createCoinsList = (result, ul, coinsCountContainer, displayFrom = 0) => {
  coinsCountContainer.innerHTML = `Total Coins (${cryptoCount(result)})`;
  ul.innerHTML = '';
  for (let i = displayFrom; i < (displayFrom + 20); i += 1) {
    ul.innerHTML += createCoinElement(result[i]);
  }
};

const displayPage = (pageControlList, result, ul, coinsCountContainer) => {
  pageControlList.forEach((element) => {
    element.addEventListener('click', () => {
      pageControlList.forEach((item) => item.classList.remove('selectedPage'));
      element.classList.add('selectedPage');
      // add popupClickHandler and likelistner to all dispalyed pages
      createCoinsList(result, ul, coinsCountContainer, element.id * 20);
      addLikesToList().then(() => {
        addLikeListner();
        addPopupClickHandlers();
      });
    });
  });
};

export {
  createCoinsList, getData, cryptoCount, displayPage,
};
