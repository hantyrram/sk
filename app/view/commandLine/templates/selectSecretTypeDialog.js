const readline = require('readline');

const i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SELECT_SECRET_TYPE = "Select Secret Type >";
const ENTER_USERNAME = "Enter Username >";
const ENTER_PASSWORD = "Enter Password >";
const ENTER_DOMAIN_NAME = "Enter Host/Domain name >";

let prompts = [];

prompts[0] = SELECT_SECRET_TYPE;
prompts[1] = ENTER_USERNAME
prompts[2] = ENTER_PASSWORD;
prompts[3] = ENTER_DOMAIN_NAME;

let answer = {};
let promptCounter = 0;

function dialog(callback){

 const i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
 });

 let prompt = prompts[promptCounter];

 i.on('line',function(line){
   if(prompt === SELECT_SECRET_TYPE){
    answer.type = line;
   }
   if(prompt === ENTER_USERNAME){
    answer.username = line;
   }
   if(prompt === ENTER_PASSWORD){
    answer.password = line;
   }
   if(prompt === ENTER_DOMAIN_NAME){
    answer.domainName = line;
   }

   promptCounter++;

   if(promptCounter < 4){
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