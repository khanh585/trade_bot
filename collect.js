const ccxt = require('ccxt');
const moment = require('moment');
const delay = require('delay'); 

require('dotenv').config()
const binance = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET_KEY
})
binance.setSandboxMode(true)
async function tick(){
    const prices = await binance.fetchOHLCV('BTC/USDT', '1m', undefined, 10);
    prices.map(price => {
        console.log(`${price[0]},${price[1]},${price[2]},${price[3]},${price[4]},${price[5]}`)
    });

}

async function main(){
    console.log('time,open,high,low,close,volume')
    while(true){
        await tick();
        await delay(60 * 1000);
    }
}

main()
// printBalance()