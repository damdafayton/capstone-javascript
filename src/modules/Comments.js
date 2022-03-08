const apiUrlForCoin = (coin) => `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

const retrieveCoinData = (coin) => {
    console.log('clicked comments')
    const popupFrame = document.querySelector('#popup-frame')
    const popupInner = popupFrame.querySelector('#popup-inner')
    popupFrame.classList.remove('d-none')
    fetch(apiUrlForCoin(coin))
        .then(result => result.json())
        .then(parsed => {
            const {
                name,
                symbol,
                market_data: { current_price: { usd: current_price } },
                market_data: { market_cap: { usd: market_cap } },
                market_data: { total_volume: { usd: total_volume } },
                market_data: { price_change_24h }
            } = parsed
            const h1 = document.createElement('h1')
            h1.innerText = name
            const spanSymbol = document.createElement
            console.log(parsed)
            popupInner.appendChild(h1)
        })
}

export { retrieveCoinData }