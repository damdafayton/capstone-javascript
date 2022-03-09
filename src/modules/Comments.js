const apiUrlForCoin = (coin) => `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

const readableNumbers = (int) => int.toString()
  .split('').reverse()
  .map((el, i) => ((i % 3 === 0 && i > 0) ? `${el},` : el))
  .reverse()
  .join('');

const digitRemover = (int) => (int > 0 ? Math.floor(int) : Math.ceil(int));
const baseCurrency = 'usd';
const symbolMap = { usd: '$' };

export default (coin) => {
  const popupFrame = document.querySelector('#popup-frame');
  const popupInner = popupFrame.querySelector('#popup-inner');
  popupFrame.classList.remove('d-none');
  fetch(apiUrlForCoin(coin))
    .then((result) => result.json())
    .then((parsed) => {
      popupInner.innerHTML = '';
      console.log(parsed);
      const {
        name,
        symbol,
        image: { large: imageSrc },
        market_data: { current_price: { [baseCurrency]: currentPrice } },
        market_data: { market_cap: { [baseCurrency]: marketCap } },
        market_data: { total_volume: { [baseCurrency]: totalVolume } },
        market_data: {
          price_change_24h: priceChange24H,
          price_change_percentage_1y: priceChange1Y,
        },
      } = parsed;
      popupInner.innerHTML += `
            <div class="position-relative p-3 m-3 border border-2 border-dark">
                <span class="position-absolute cursor-pointer" id="popup-close">X</span>
                <img src="${imageSrc}">            
                <h2 class="mt-3">${name}</h2>
                <div class="mb-3">
                    24H: <span class=${priceChange24H < 0 ? 'value-drop' : 'value-increase'}>${symbolMap[baseCurrency]}${digitRemover(priceChange24H)}</span>
                    1Y: <span class=${priceChange1Y < 0 ? 'value-drop' : 'value-increase'}>${digitRemover(priceChange1Y)}%</span>
                </div>
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
            </div>`;
    })
    .then(() => {
      const popupClose = document.querySelector('#popup-close');
      popupClose.addEventListener('click', () => {
        popupFrame.classList.add('d-none');
      });
    });
};