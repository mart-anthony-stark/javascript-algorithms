const fs = require('fs')

const convertEndpoints = file => {
    let filteredData = []
    // Reads the file and store every lines in array
    const readStream = fs.createReadStream(file, 'utf-8')
    readStream.on('data', (chunk) => {
        const data = chunk.split('\r\n')
        const commonWord = getCommonWord(data)
        filterLines(data, commonWord)
    })

    // Determines the common word in every endpoints
    const getCommonWord = (lines) => {
        let result = []
        lines.forEach(line => {
            let splittedLine = line.split('/')
            splittedLine.forEach(chunk => {
                if(chunk.includes('get') || chunk.includes('update') || chunk.includes('delete') || chunk.includes('fetch')){
                    chunk = chunk.replace("get", "")
                    chunk = chunk.replace("update", "")
                    chunk = chunk.replace("delete", "")
                    chunk = chunk.replace("fetch", "")
                    if(!result.includes(chunk))
                        result.push(chunk)
                }
            })
        })
        return result[0]
    }

    // Filters data that includes the common word
    const filterLines = (lines, commonWord) => {
        filteredData = lines.filter(line => line.includes(commonWord))
        
    }
}

convertEndpoints('./file.txt')