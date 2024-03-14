const fs = require('fs');
function writeToFile(filePath, content) {
    fs.writeFile(filePath,'utf-8',(error,content)=>{
   if(error){
    console.log('Error writing to file:', error.message);
   }
   else{
    console.log('Data written to output.txt',filePath);
    console.log(content)
   }
});  
}

writeToFile('test-files/output1.txt', 'Sample content.');

writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');