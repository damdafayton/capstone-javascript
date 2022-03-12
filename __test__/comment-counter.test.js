/**
 * @jest-environment jsdom
 */

import { commentCounter } from '../src/modules/comments';

test('calculates the amount of comments in the dom', () => {
  document.body.innerHTML = `
            <div id="comments" class="">
                <h3 class="fw-bolder fs-5">Comments (3)</h3>
                <p class="text-start">2022-03-09 - new comment - by jo</p>
                <p class="text-start">2022-03-09 - hi - by user</p>
                <p class="text-start">2022-03-10 - hello - by cr</p>
            </div>`;
  expect(commentCounter()).toBe(3);
});