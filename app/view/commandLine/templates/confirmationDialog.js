const readline = require('readline');

const i = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = function(objectWithPromptAndCallback){

  let prompt = objectWithPromptAndCallback.prompt;
  let callback = objectWithPromptAndCallback.callback;

  i.on('line',function(answer){
    i.close();
    callback(answer);    
  });

  i.setPrompt(prompt);
  i.prompt();
}