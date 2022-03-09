import { apiInvolvement, appID } from './api';
// temporary code - get app id
// fetch(apiInvolvement, { method: 'POST' })
//   .then((result) => result.text())
//   .then((parsed) => { appID = parsed; })
//   .then(() => console.log(appID));
// temporary code ends

export function commentFetch(coin) {
  return fetch(`${apiInvolvement + appID}/comments?item_id=${coin}`)
    .then((response) => response.status === 200 && response.json())
    .then((parsed) => {
      console.log(parsed);
      if (parsed.length > 0) {
        const comments = document.querySelector('#comments');
        comments.innerHTML = '<p class="fw-bolder">Comments</p>';
        parsed.forEach((eachComment) => {
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

export function commentSubmitHandler(id) {
  const formBtn = document.querySelector('#submit-form > button');
  console.log('comment submit handler ', formBtn);
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = formBtn.parentElement;
    const { username: { value: username }, comment: { value: comment } } = form;
    console.log({ id, username, comment });

    fetch(`${apiInvolvement + appID}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id, username, comment }),
    })
      .then((response) => response.status === 201 && commentFetch(id));
  });
}