import { apiInvolvement, appID } from './api';
// temporary code - get app id
// fetch(apiInvolvement, { method: 'POST' })
//   .then((result) => result.text())
//   .then((parsed) => { appID = parsed; })
//   .then(() => console.log(appID));
// temporary code ends

function commentsFetch(coin) {
  return fetch(`${apiInvolvement + appID}/comments?item_id=${coin}`);
}

export function commentsPopulate(coin) {
  commentsFetch(coin)
    .then((response) => response.status === 200 && response.json())
    .then((allComments) => {
      if (allComments.length > 0) {
        const comments = document.querySelector('#comments');
        comments.innerHTML = `<p class="fw-bolder">Comments (${allComments.length})</p>`;
        allComments.forEach((eachComment) => {
          const { creation_date: cd, comment: c, username: u } = eachComment;
          const p = document.createElement('p');
          const spanCounter = document.querySelector('#comments > p > span');
          p.innerText = `${cd} - ${c} - by ${u}`;
          p.classList.add('text-start');
          spanCounter.innerText = `(${commentCount})`;
          comments.appendChild(p);
        });
        comments.classList.remove('d-none');
      }
    });
}

function commentSubmitToApi(body) {
  return fetch(`${apiInvolvement + appID}/comments`, {
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