const chart = require('asciichart')
const fs = require('fs')
const fsw = require('fs')

function plotAsset(){
    // const lines = fs.readFileSync('./trade_log.txt', 'utf8').split("\n")
    const assets = []
    const data = fs.readFileSync('./trade_log.txt', 'utf8');
    // split the contents by new line
    const lines = data.toString().split(/\r?\n/);

  
    // Write data in 'Output.txt' .
    

    // print all lines
    lines.forEach((line) => {
        fsw.writeFile('a.txt', line, (err) => {
            if (err) throw err;
        });
        // if (line.includes("Total USDT")){
        //     const asset = line.replace('Total USDT:', '').trim()
        //     assets.push(parseFloat(asset))
        // }
    });

    // for (const line of lines){
    //     if (line.includes("Total USDT")){
    //         const asset = line.replace('Total USDT:', '').trim()
    //         assets.push(parseFloat(asset))
    //     }
    // }
    // console.clear()
    // console.log(chart.plot(assets, {
    //     height: 30
    //  }))
}

plotAsset()