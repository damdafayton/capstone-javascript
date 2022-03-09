import Request from './request';

const coinsUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const request = new Request(coinsUrl);
const appID = 'WXXsCPtk675NtAM8NnCG';
const apiInvolvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

export { request, apiInvolvement, appID };