import { addCoinLikes } from './Likes';

export default function populateHome() {

}

const getData = async (request) => {
  const response = await request.get();
  // console.log(response)
  const data = response.json();
  return data;
};
const cryptoCount = (array) => array.length;

const createCoinElement = (coin) => `<li><ul class="coin">
                       <li>${coin.market_cap_rank}</li>
                       <li class="coinIcons"><img class="coinImage" src=${coin.image} alt='coin'/><strong>${coin.name}</strong></li>
                       <li class="likeIcons"><button id='likeBtn-${coin.id}' class="likeBtn" ><p></p><i class="fas fa-heart"></i></button></li>
                       <li>${coin.symbol}
                       <button class="buyButton" >Buy
                       <i class="fas fa-shopping-basket"></i></button>
                       </li>
                       <li> ${coin.current_price}$</li>
                       <li style="color:${coin.price_change_percentage_24h > 0 ? 'green' : 'red'}">${coin.price_change_percentage_24h}</li>
                       <li>${coin.circulating_supply}</li>
                       <li><i class="fas fa-comment-alt" id=${coin.id}></i></li>
                   </ul>
                </li>`;

const createCoinsList = async (request, ul, coinsCountContainer, displayFrom = 0) => {
  const result = await getData(request);
  coinsCountContainer.innerHTML = cryptoCount(result);
  ul.innerHTML = '';
  for (let i = displayFrom; i < (displayFrom + 10); i += 1) {
    ul.innerHTML += createCoinElement(result[i]);
    // after creating list item i add likes and likeeventistner to it
    await addCoinLikes(result[i].id, ul.querySelector(['#likeBtn-', result[i].id].join('')));
    // addLikeBtnListner(result[i].id,ul.querySelector(['#likeBtn',result[i].id].join('')));
  }
};

const displayPage = (pageControlList, request, ul, coinsCountContainer) => {
  pageControlList.forEach((element) => {
    element.addEventListener('click', () => {
      pageControlList.forEach((item) => item.classList.remove('selectedPage'));
      element.classList.add('selectedPage');
      createCoinsList(request, ul, coinsCountContainer, element.id * 10);
    });
  });
};

export {
  createCoinsList, getData, cryptoCount, displayPage,
};
