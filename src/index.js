import './style.scss';
import retrieveCoinData from './modules/Comments';
import url from './api';

const mockComments = document.querySelector('#mock-comments');
const mockCoin = 'bitcoin';

mockComments.addEventListener('click', () => retrieveCoinData(mockCoin));
console.log(url); // to prevent linter error