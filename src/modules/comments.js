import { apiInvolvement } from './api';

function commentsFetch(coin) {
  return fetch(`${apiInvolvement}comments?item_id=${coin}`)
    .then((response) => response.status === 200 && response.json());
}

export function commentCounter() {
  return document.querySelectorAll('#comments > p').length;
}

export function commentsPopulate(coin) {
  commentsFetch(coin)
    .then((allComments) => {
      if (allComments.length > 0) {
        const comments = document.querySelector('#comments');
        comments.innerHTML = `<h3 class="fw-bolder fs-5">Comments (${allComments.length})</h3>`;
        allComments.forEach((eachComment) => {
          const { creation_date: cd, comment: c, username: u } = eachComment;
          const p = document.createElement('p');
          p.innerText = `${cd} - ${c} - by ${u}`;
          p.classList.add('text-start');
          comments.appendChild(p);
        });
        comments.classList.remove('d-none');
      }
    });
}

function commentSubmitToApi(body) {
  return fetch(`${apiInvolvement}comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

export function commentSubmitHandler(coinId) {
  const formBtn = document.querySelector('#submit-form > button');
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = formBtn.parentElement;
    const { username: { value: username }, comment: { value: comment } } = form;
    const body = JSON.stringify({ item_id: coinId, username, comment });
    commentSubmitToApi(body)
      .then((response) => response.status === 201 && commentsPopulate(coinId));
  });
}
