const fs = require('fs')

const convertEndpoints = file => {
    let filteredData = []
    // Reads the file and store every lines in array
    const readStream = fs.createReadStream(file, 'utf-8')
    readStream.on('data', (chunk) => {
        const data = chunk.split('\r\n')
        const commonWord = getCommonWord(data)
        console.log({data})
        console.log({commonWord})
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
        console.log({filteredData})
        
        // Create array of objects with endpoint and request method fields
        const jsonContent = filteredData.map(data => {
            const method = data.includes('get') || data.includes('fetch') ? 'GET' : (data.includes('update') ? 'PUT' : (data.includes('delete') ? 'DELETE' : 'POST'))
            return {
                endpoint: data.split(' = ')[1],
                method
            }
        })

        fs.writeFile('filteredEndpoints.json', JSON.stringify(jsonContent), (e)=>{
            if(e) console.log(e)
            else console.log('JSON File created Successfully')
        })
    }
}

convertEndpoints('./dummy.properties')