import './style.scss';
import { retrieveCoinData } from './modules/Comments';

const mockComments = document.querySelector('#mock-comments')
const mockCoin = 'bitcoin'

mockComments.addEventListener('click', () => retrieveCoinData(mockCoin))
