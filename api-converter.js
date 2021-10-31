const fs = require('fs')

const readStream = fs.createReadStream('./file.txt', 'utf-8')

readStream.on('data', (chunk) => {
    const endpoints = chunk.split('\r\n')
    extractCommonWord(endpoints)
})

const extractCommonWord = (lines) => {
    console.log({lines})
    lines.forEach(element => {
        console.log(element)
    });
}