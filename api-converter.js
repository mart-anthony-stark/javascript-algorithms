const fs = require('fs')

function convertEndpoints(file ) {
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
                splittedLine.forEach(word => {
                    if(word.includes('get') || word.includes('update') || word.includes('delete') || word.includes('fetch')){
                        word = word.replace("get", "")
                        word = word.replace("update", "")
                        word = word.replace("delete", "")
                        word = word.replace("fetch", "")
                        result.push(word)
                    }
                })
            })
            console.log(result)
            if(result.length === 1) return result[0]
            
            return result.sort((a,b) =>
                    result.filter(v => v===a).length
                - result.filter(v => v===b).length
            ).pop();
    }

    // Filters data that includes the common word
    const filterLines = (lines, commonWord) => {
        filteredData = lines.filter(line => line.includes(commonWord))
        
        console.log({filteredData})
        
        // Create array of objects with endpoint and request method fields
        const jsonContent = filteredData.map(data => {
            const method = data.includes('get') || data.includes('fetch') ? 'GET' : (data.includes('update') ? 'PUT' : (data.includes('delete') ? 'DELETE' : 'POST'))
            return [ data.split(' = ')[1], method]
        })

        const formattedJSON = {}
        formattedJSON[`${commonWord} Api Collection`] = jsonContent

        fs.writeFile(`${commonWord} Api Collection.json`, JSON.stringify(formattedJSON), (e)=>{
            if(e) console.log(e)
            else {
                console.log('JSON File created Successfully')
                console.log(formattedJSON)
            }
        })
    }
}

convertEndpoints('./dummy.properties')