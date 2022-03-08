
export async function fetchComments(coin) {
    // temporary code starts
    var appID;
    const endpoints = {
        apps: '/apps/',
        likes: `/apps/${appID}/likes`,
        comments: `/comments?item_id=${coin}`
    }
    const apiInvolvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi'
    await fetch(apiInvolvement + endpoints.apps, { method: 'POST' })
        .then(result => result.text())
        .then(parsed => appID = parsed)
        .then(() => console.log(appID))
    // temporary code ends

    await fetch(apiInvolvement + endpoints.apps + appID + endpoints.comments)
        .then(response => response.json())
        .then(parsed => console.log(parsed))
}