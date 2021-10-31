const fs = require('fs')

const readStream = fs.createReadStream('./file.txt', 'utf-8')

readStream.on('data', (chunk) => {
    const endpoints = chunk.split('\r\n')
    console.log(commonWord(endpoints))
})

const commonWord = (lines) => {
    let result = []
    lines.forEach(line => {
        let splittedLine = line.split('/')
        splittedLine.forEach(chunk => {
            if(chunk.includes('get') || chunk.includes('update') || chunk.includes('delete') || chunk.includes('fetch')){
                chunk = chunk.replace("get", "")
                chunk = chunk.replace("update", "")
                chunk = chunk.replace("delete", "")
                chunk = chunk.replace("fetch", "")
                result.push(chunk)
            }
        })
    })
    return result
}
