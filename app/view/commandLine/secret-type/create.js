const readline = require('readline');

const i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENTER_SECRET_TYPE = "Enter name of the secret type >";
const ENTER_DESCRIPTION = "Enter description >";

let prompts = [];

prompts[0] = ENTER_SECRET_TYPE;
prompts[1] = ENTER_DESCRIPTION

let answer = {};
let promptCounter = 0;

function dialog(callback){

 const i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
 });

 let prompt = prompts[promptCounter];

 i.on('line',function(line){
   if(prompt === ENTER_SECRET_TYPE){
    answer.type = line;
   }
   if(prompt === ENTER_DESCRIPTION){
    answer.username = line;
   }

   promptCounter++;

   if(promptCounter < prompts.length){
    console.log(`You've entered ${line}: ${promptCounter}`);
    i.close();
    dialog(callback);
   }else{
    i.close();
    callback(answer);
   }
 });

 i.setPrompt(prompt);
 i.prompt();
}

module.exports = function(callback){
 dialog(callback);
};