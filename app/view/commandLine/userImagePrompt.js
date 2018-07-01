let readline = require('readline');
const PROMPT = 'Enter path to image: ';

module.exports = function(inputHandler){
 
   let i = readline.createInterface({
    input: process.stdin,
    output: process.stdout
   });
 
   i.on('line',(input)=>{
    i.close();
    inputHandler.handle(input);
 
   });
  
   i.setPrompt(PROMPT);
   i.prompt();
 
 }