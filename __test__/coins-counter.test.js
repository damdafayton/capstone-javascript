/**
 * @jest-environment jsdom
 */

import { createCoinsList } from '../src/modules/Home';
import { request } from '../src/modules/api';

document.body.innerHTML = `
             <p class="coinsCountContainer"></p>
             <ul class="listCoinsContainer"></ul>
             `;

test('the coin cards displayed in the DOM to be as match as items retreived from api', () => {
  createCoinsList(request, document.querySelector('.listCoinsContainer'), document.querySelector('.coinsCountContainer'));
  const countLi = document.querySelectorAll('.coin');
  expect(countLi.length).toBe(20);
});