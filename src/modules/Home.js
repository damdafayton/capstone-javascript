import { addCoinLikes } from './Likes';
import { addLikeListner } from './Likes';
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
                       <li>Comments <i class="fas fa-comment-alt" id=${coin.id}></i></li>
                   </ul>
                </li>`;

const createCoinsList = async (request, ul, coinsCountContainer, displayFrom = 0) => {
  const result = await getData(request);
  coinsCountContainer.innerHTML = `Cryptocurrencies(${cryptoCount(result)})`;
  ul.innerHTML = '';
  for (let i = displayFrom; i < (displayFrom + 20); i += 1) {
    ul.innerHTML += createCoinElement(result[i]);
    // after creating list item i add likes and likeeventistner to it
    await addCoinLikes(result[i].id, ul.querySelector(['#likeBtn-', result[i].id].join('')));
  }
};

const displayPage = (pageControlList, request, ul, coinsCountContainer) => {
  pageControlList.forEach((element) => {
    element.addEventListener('click', () => {
      pageControlList.forEach((item) => item.classList.remove('selectedPage'));
      element.classList.add('selectedPage');
      //add popupClickHandler and likelistner to all dispalyed pages
      createCoinsList(request, ul, coinsCountContainer, element.id * 20).then(() => {
        addLikeListner();
        addPopupClickHandlers();
      });
    });
  });
};

export {
  createCoinsList, getData, cryptoCount, displayPage,
};
