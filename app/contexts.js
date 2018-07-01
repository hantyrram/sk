const Context = require('./Context');

/**
 * Define contexts here
 */

let initImage = new Context('init-image',Context.DEPTH.IMAGE_INIT);
let login = new Context('login',Context.DEPTH.LOGIN); 
let main = new Context('main',Context.DEPTH.MAIN);
let dialog = new Context('dialog',Context.DEPTH.DIALOG);

//Add commands to the contexts
module.exports = function(commands){
  
  main.addCommand(commands['add']);
  main.addCommand(commands['show']);
  main.addCommand(commands['clear-database']);
  // main.addCommand(commands['show-secrets']);
  main.addCommand(commands['help']);
  main.addCommand(commands['quit']);
  dialog.addCommand(commands['create']);
  
  
  let contexts = [];
  contexts['init-image'] = initImage;
  contexts['login'] = login;
  contexts['main'] = main;
  contexts['dialog'] = dialog;
  
  return contexts;
}











