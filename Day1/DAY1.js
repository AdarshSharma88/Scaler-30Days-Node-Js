const fs = require('fs');

function readFileContent(filepath) {
    fs.readFile(filepath, 'utf-8', (error, content) => {
        if (error) {
            console.error('Error reading file:', error.message);
        } else {
            console.log('File Content:');
            console.log(content || '(empty string)');
            console.log('Hello, Node.js!');
        }
    });
}
readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');