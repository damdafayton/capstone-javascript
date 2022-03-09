let appID = 'WXXsCPtk675NtAM8NnCG';
const apiInvolvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

// temporary code - get app id
// fetch(apiInvolvement, { method: 'POST' })
//   .then((result) => result.text())
//   .then((parsed) => { appID = parsed; })
//   .then(() => console.log(appID));
// temporary code ends

export function commentFetch(coin) {
  fetch(`${apiInvolvement + appID}/comments?item_id=${coin}`)
    .then((response) => response.json())
    .then((parsed) => {
      console.log(parsed);
      const commentCount = parsed.length;
      if (commentCount > 0) {
        const comments = document.querySelector('#comments');
        parsed.forEach((eachComment) => {
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

export function commentSubmitHandler(id) {
  const formBtn = document.querySelector('form > button');
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = formBtn.parentElement;
    const { username: { value: username }, comment: { value: comment } } = form;

    fetch(`${apiInvolvement + appID}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id, username, comment }),
    })
      .then((response) => response.status === 201 && commentFetch(id));
  });
}