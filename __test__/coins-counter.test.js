/**
 * @jest-environment jsdom
 */

 import { createCoinsList } from '../src/modules/home';
 import {request} from '../src/modules/api';

 document.body.innerHTML = `
             <p class="coinsCountContainer"></p>
             <ul class="listCoinsContainer"></ul>
             `;

 test('the coin cards displayed in the DOM to be as items retreived from api', () => {
    createCoinsList(request, listCoinsContainer, coinsCountContainer);
    const countLi=document.querySelectorAll('.coin');        
    expect(countLi.length).toBe(20);
 });