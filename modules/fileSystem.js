const fs = require('fs')

const createFile = (fileName, content) => {
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Create File successfully")
    });
}

// module.exports = {
//     createFile
// }

const readFile = (fileName) => {
    fs.readFile(fileName, (err) => {
        if (err) {
            console.error(err)
        }
        const content = fs.readFileSync(fileName, 'utf-8');
        console.log(`Content of file ${fileName}`)
        console.log(content)
    })
}

module.exports = {
    createFile,readFile
}