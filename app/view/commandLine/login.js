const readline = require('readline');

let PROMPT = 'Enter Password To Login: ';

module.exports = function(inputHandler){
 let i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
 });

 i.on('line',function(line){
  i.close();
  inputHandler.handle(line);
 });
 
 i.setPrompt(PROMPT);

 i.prompt();
}