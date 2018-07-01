/**
 * Define, create Commands here
 */

const Command = require('./Command');
let commands = []; 
/**
 * Executor's key MUST be the same as the command name. Meaning executors should have the same name as the Command being 
 * defined. 
 */
module.exports = function(executors){

  
  commands['add'] = new Command('add','Adds a new secret');    
  commands['add'].addExecutor(executors['add-secret'],'-s').setDefault();
  commands['add'].addExecutor(executors['add-collection'],'-c');
  commands['add'].addExecutor(executors['add-username-password'],'-up');
  commands['add'].setCommandHelpExecutor(executors['add-self-help']);
  
  commands['show'] = new Command('show','Displays help menu');
  commands['show'].addExecutor(executors['show-secret'],'-s');
  commands['show'].addExecutor(executors['show-secret-all'],'-s-all');
  commands['show'].addExecutor(executors['show-collections-all'],'-c-all');
  commands['show'].setCommandHelpExecutor(executors['add-self-help']);

  commands['clear-database'] = new Command('clear-database','Clears the contents of the database');
  commands['clear-database'].addExecutor(executors['clear-database']);

  commands['quit'] = new Command('quit','Exits the program');
  commands['quit'].addExecutor(executors['quit']);
  commands['quit'].setCommandHelpExecutor(executors['add-self-help']);

  commands['help'] = new Command('help','Displays help menu');
  commands['help'].addExecutor(executors['help']);
  commands['help'].setCommandHelpExecutor(executors['add-self-help']);

  commands['create'] = new Command('create','Creates a secret or collection');
  commands['create'].addExecutor(executors['create-secret'],'-s');
  commands['create'].addExecutor(executors['create-secret-type'],'-t');
  
  return commands;
}


