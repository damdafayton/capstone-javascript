import { addLikesToList, addLikeListner } from './Likes';

import addPopupClickHandlers from './PopUp';

export default function populateHome() {

}

const getData = async (request) => {
  const response = await request.get();
  const data = response.json();
  return data;
};
const cryptoCount = (array) => array.length;

const createCoinElement = (coin) => `<li><ul class="coin">
                
                       <li class="coinIcons"><img class="coinImage" src=${coin.image} alt='coin'/></li>
                       <div class="nameAndLikes">
                       <li><strong>${coin.name}</strong></li>
                       <li class="likeIcons"><button id='likeBtn-${coin.id}' class="likeBtn" > <i class="fas fa-heart"></i><p></p></button></li>
                       </div>
                       <li>${coin.symbol}
                       <button class="buyButton" >Buy
                       <i class="fas fa-shopping-basket"></i></button>
                       </li>
                       <li id=${coin.id} class="commentAddIcon">Comments <i class="fas fa-comment-alt" ></i></li>
                   </ul>
                </li>`;

const createCoinsList = (result, ul, coinsCountContainer, displayFrom = 0) => {
  coinsCountContainer.innerHTML = `Criptocurrencies(${cryptoCount(result)})`;
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
