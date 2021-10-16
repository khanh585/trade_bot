const ccxt = require('ccxt');
const moment = require('moment');
const delay = require('delay'); 
const chart = require('asciichart')

require('dotenv').config()
const binance = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET_KEY
})
binance.setSandboxMode(true)

async function printBalance(btcPrice){
    const balance = await binance.fetchBalance();
    const total = balance.total
    // console.log(`Balance: BTC ${total.BTC} USDT: ${total.USDT}`);
    // console.log(`Total USDT: ${(total.BTC - 1) * btcPrice + total.USDT}. \n`);
    return (total.BTC - 1) * btcPrice + total.USDT
}

async function tick(){
    const prices = await binance.fetchOHLCV('BTC/USDT', '1m', undefined, 6);
    const fPrices =  prices.map(price => {
        return {
            "timestamp": moment(price[0]).format(),
            "open": price[1],
            "high": price[2],
            "low": price[3],
            "close": price[4],
            "volume": price[5],
        }
    });

    // thuat toan du dinh bat day 
    const avePrice = fPrices.reduce((acc, price) => acc + price.close, 0) / 6
    const lastPrice = fPrices[fPrices.length - 1].close
    // console.log(fPrices.map(p => p.close), avePrice, lastPrice);
    const direction = lastPrice > avePrice ? 'sell' : 'buy'

    const TRADE_SIZE = 30
    const quatity = TRADE_SIZE / lastPrice
    // console.log(`${moment().format()}: ${direction} ${quatity} BTC at ${lastPrice}`)
    const order = await binance.createMarketOrder('BTC/USDT', direction, quatity)
    return printBalance(lastPrice)

}

async function main(){
    time = 120
    assets = []
    while(true){
        asset = await tick();
        assets.push(parseFloat(asset))
        console.clear()
        console.log(chart.plot(assets, {
            height: 30
        }))
        await delay(60 * 1000);
    }

}

main()
// printBalance()