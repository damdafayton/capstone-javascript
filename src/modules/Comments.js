var appID;
const apiInvolvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'

// temporary code
fetch(apiInvolvement, { method: 'POST' })
    .then(result => result.text())
    .then(parsed => appID = parsed)
    .then(() => console.log(appID))
// temporary code ends

export function commentFetch(coin) {
    fetch(apiInvolvement + appID + `/comments?item_id=${coin}`)
        .then(response => response.json())
        .then(parsed => {
            console.log(parsed)
            if (parsed.length > 0) {
                const comments = document.querySelector('#comments')
                parsed.forEach(eachComment => {
                    const { creation_date, comment, username } = eachComment
                    const p = document.createElement('p')
                    p.innerText = creation_date + ' - ' + comment + ' - by ' + username
                    p.classList.add('text-start')
                    comments.appendChild(p)
                })
                comments.classList.remove('d-none')
            }
        })
}

export function commentSubmitHandler(item_id) {
    const formBtn = document.querySelector('form > button')
    formBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const form = formBtn.parentElement
        const { username: { value: username }, comment: { value: comment } } = form
        console.log({ item_id, username, comment })

        fetch(apiInvolvement + appID + '/comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_id, username, comment })
        })
            .then(response => response.status == 201 && commentFetch(item_id))
    })
}