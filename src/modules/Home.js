export default function populateHome() {

}

const getData = async (request) => {
    const response = await request.get();
    // console.log(response)
    const data = response.json();
    return data;
  };
const cryptoCount=(array)=>{
    return array.length;
}  
  
  const createCoinElement = (coin) => `<li><ul class="coin">
                       <li>${coin.market_cap_rank}</li>
                       <li class="coinIcons"><img class="coinImage" src=${coin.image} alt='coin'/><strong>${coin.name}</strong></li>
                       <li>${coin.symbol}
                       <button class="buyButton">Buy
                       <i class="fas fa-shopping-basket"></i></button>
                       </li>
                       <li> ${coin.current_price}$</li>
                       <li style="color:${coin.price_change_percentage_24h > 0 ? 'green' : 'red'}">${coin.price_change_percentage_24h}</li>
                       <li>${coin.circulating_supply}</li>
                   </ul>
                </li>`;
  const addToDom = async (request, ul) => {
    const result = await getData(request);
    console.log(result);
    ul.innerHTML = '';
    console.log('tag element::', ul);
    for (let i = 0; i < 10; i += 1) {
      ul.innerHTML += createCoinElement(result[i]);
    }
  };

  export {addToDom, getData, cryptoCount};