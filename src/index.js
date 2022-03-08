import './style.scss';
import Request from "./modules/request";

const coinsUrl='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const url='https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QzuepOdb4S7f14QxmbA0/scores';
const request = new Request(coinsUrl);
const req= new Request(url);
const coins=document.querySelector('.coins');

const getData=async(request)=>{
     var response= await request.get();
    // console.log(response)
     var data=response.json()
     return data;      
}

const createCoinElement=(coin)=>{
     return `<li><ul class="coin">
                     <li>${coin.market_cap_rank}</li>
                     <li class="coinIcons"><img class="coinImage" src=${coin.image} alt='coin'/><strong>${coin.name}</strong></li>
                     <li>${coin.symbol}
                     <button class="buyButton">Buy
                     <i class="fas fa-shopping-basket"></i></button>
                     </li>
                     <li> ${coin.current_price}usd</li>
                     <li style="color:${coin.price_change_percentage_24h>0?'green':'red'}">${coin.price_change_percentage_24h}</li>
                     <li>${coin.circulating_supply}</li>
                 </ul>
              </li>`;
}
const addToDom=async(request,ul)=>{
    var result=await getData(request);
    console.log(result);
    ul.innerHTML = ``;
    console.log('tag element::',ul);
     result.forEach(element => {
             ul.innerHTML  +=createCoinElement(element);
          }); 
}

addToDom(request,coins);


