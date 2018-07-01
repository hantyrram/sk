const readline = require('readline');
const chalk = require('chalk');
var prompt = chalk.bold.whiteBright('sk:');

/**
 *  Main display command mode
 * @param {*} inputHandler 
 */
function main(inputHandler){
 let i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
 });

 global.mainInterface = i;

 i.on('line',function(line){

  if(line === 'quit'){
   i.close();
   inputHandler.handle(line);      
  }

  inputHandler.handle(line);
  i.close();
  main(inputHandler);   //repeat
  
 });
 
 i.setPrompt(prompt);

 i.prompt();

}

module.exports = main;

module.exports.changePrompt = function(text){
 prompt = chalk.bold.whiteBright( prompt + ' ' + text + ' >');
}

