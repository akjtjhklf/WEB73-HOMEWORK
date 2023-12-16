const fileSystem = require('./modules/fileSystem')

fileSystem.createFile('Test.txt', 'Hello world!')

fileSystem.readFile('Test.txt')