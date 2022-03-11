import { commentsPopulate, commentSubmitHandler } from './comments';
import { apiCoin } from './api';

const readableNumbers = (int) => int.toString()
  .split('.')
  .map((cn, j) => (j === 0
    ? cn.split('').reverse()
      .map((el, i) => ((i % 3 === 0 && i > 0) ? `${el},` : el))
      .reverse()
      .join('')
    : cn))
  .join('.');

const digitRemover = (int) => (int > 0 ? Math.floor(int) : Math.ceil(int));
const baseCurrency = 'usd';
const symbolMap = { usd: '$' };

const fetchCoinData = (coin) => fetch(apiCoin(coin)).then((result) => result.json());

const clickHandler = (coin) => {
  const popupFrame = document.querySelector('#popup-frame');
  const popupInner = popupFrame.querySelector('#popup-inner');
  popupFrame.classList.remove('d-none');
  fetchCoinData(coin)
    .then((coinData) => {
      popupInner.innerHTML = '';
      console.log(coinData);
      const {
        name,
        symbol,
        image: { large: imageSrc },
        market_data: { current_price: { [baseCurrency]: currentPrice } },
        market_data: { market_cap: { [baseCurrency]: marketCap } },
        market_data: { total_volume: { [baseCurrency]: totalVolume } },
        market_data: {
          price_change_percentage_24h: priceChange24H,
          price_change_percentage_1y: priceChange1Y,
        },
      } = coinData;
      popupInner.innerHTML += `
            <div class="position-relative p-3 m-3 border border-2 border-dark">
                <span class="position-absolute cursor-pointer" id="popup-close">X</span>
                <img src="${imageSrc}">            
                <h2 class="mt-3">${name}</h2>
                <div class="mb-3">
                    24H: <span class=${(digitRemover(priceChange24H) !== 0) && priceChange24H < 0 ? 'value-drop' : 'value-increase'}>${digitRemover(priceChange24H) ? digitRemover(priceChange24H) + '%' : '-'}</span>
                    1Y: <span class=${(digitRemover(priceChange24H) !== 0) && priceChange1Y < 0 ? 'value-drop' : 'value-increase'}>${digitRemover(priceChange1Y) ? digitRemover(priceChange1Y) + '%' : '-'}</span >
                </div >
                <div class="row row-cols-2">
                    <div class="d-flex justify-content-center">
                    <ul class="text-start">
                        <li>Symbol: ${symbol.toUpperCase()}</li>
                        <li>Price: ${symbolMap[baseCurrency]}${readableNumbers(currentPrice)}</li>
                    </ul>
                    </div>
                    <div class="d-flex justify-content-center">
                    <ul class="text-start">
                        <li>Market Cap: ${symbolMap[baseCurrency]}${readableNumbers(marketCap)}</li>
                        <li>Total Volume: ${symbolMap[baseCurrency]}${readableNumbers(totalVolume)}</li>
                    </ul>
                    </div>
                </div>
                <div>
                  <div id="comments" class="d-none">
                  </div>
                  <h3 class="fw-bolder fs-5">Add Comment</h3>
                  <form id="submit-form" class="d-flex flex-column align-items-center row row-cols-md-2 row-cols-lg-3">
                    <div>
                      <input class="form-control" type="text" name="username" placeholder="username">
                      <textarea class="form-control mt-2" type="text" name="comment" placeholder="write your comment here"></textarea>
                      <button class="btn btn-info text-white mt-2">Submit</button>
                    </div>
                  </form>
                </div>
            </div > `;
    })
    .then(() => {
      const popupClose = document.querySelector('#popup-close');
      popupClose.addEventListener('click', () => {
        popupFrame.classList.add('d-none');
      });
    })
    .then(() => commentsPopulate(coin))
    .then(() => commentSubmitHandler(coin));
};

export default () => {
  const coins = document.querySelectorAll('.coins > li');
  coins.forEach((coin) => {
    const btn = coin.querySelector('.buyButton');
    btn.addEventListener('click', (e) => {
      let coinName = e.currentTarget.parentElement.parentElement.querySelector('.likeBtn').id;
      const dashIndex = coinName.indexOf('-');
      coinName = coinName.slice(dashIndex + 1);
      clickHandler(coinName);
    });
  });
};

export { digitRemover };