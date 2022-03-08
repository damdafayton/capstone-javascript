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
const addToDom=async(request,ul)=>{
    var result=await getData(request);
    ul.innerHtml = '';
    console.log(result);
     result.forEach(element => {
             ul.innerHtml +=`<li>${element.name}</li>`;
             console.log(element.name)
          }); 
}

addToDom(request,coins);
