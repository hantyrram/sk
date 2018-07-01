
const readline = require('readline');
const events = require('events');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const ora = require('ora');
// const figures = require('figures');

module.exports = new events.EventEmitter;

module.exports.display = function(viewName,inputHandler){

  eval(viewName).bind(this);
  eval(viewName)(inputHandler);

}

module.exports.displayError = function(error){
 // console.log(require('./templates/error.js')(ora(error.message).fail()));
 require('./templates/error.js')(error.message);
 // console.log(logSymbols.error,colors.red(' Error: ' + error.message));
}

module.exports.displayMessage = function(message){
 console.log(require('./templates/message.js')(message));
}

module.exports.displayHelp = function(commands){
 console.log(require('./templates/help.js')(commands));
}

module.exports.displayCommandHelp = function(command){
  console.log(require('./templates/commandHelp.js')(command));
 }

 module.exports.displaySecret = function(secret){
  console.log(require('./templates/secret.js')(secret));
 } 

module.exports.displaySecrets = function(secrets){
 console.log(require('./templates/secrets.js')(secrets));
}

module.exports.displayCollections = function(collections){
 console.log(require('./templates/collections.js')(collections));
}

module.exports.displayInfo = function(text){ 
  console.log(require('./templates/info.js')(`${logSymbols.info} ${text}`));
}

module.exports.displayInfoWarning = function(text){ 
  console.log(require('./templates/info.js')(`${logSymbols.warning} ${text}`));
}

module.exports.displayInfoSuccess = function(text){  
  console.log(require('./templates/info.js')(`${logSymbols.success} ${text}`));
}

module.exports.displayConfirmationDialog = function(objectWithPromptAndCallback){  
  require('./templates/confirmationDialog.js')(objectWithPromptAndCallback);
}

module.exports.displaySecretTypeMenu = function(){  
 console.log(require('./templates/secretTypeMenu.js')());
}

module.exports.displaySelectSecretTypeDialog = function(prompt,callback){  
 require('./templates/selectSecretTypeDialog.js')(prompt,callback);
}

module.exports.secretTypeCreate = function(callback){  
 require('./secret-type/create.js')(callback);
}
module.exports.changePrompt = require('./main').changePrompt;

function start(inputHandler){
  inputHandler.handle('view-opened');
  this.displayInfo('View Opened');
}

module.exports.userImagePrompt = require('./userImagePrompt');
module.exports.login = require('./login');
module.exports.main = require('./main');
module.exports.start = start;
