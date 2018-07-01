'use strict';
const secretFactory = require('./model/secretFactory');
/**
 * Adds a secret
 * @param {iDB} db iDB instance 
 * @param {ContextManager} contextManager 
 * @param {Array} commandArguments - command arguments in an array
 */
function addSecret(db,contextManager,commandArguments){  
  let secret;
  try {
     secret = secretFactory.create(commandArguments);  
  } catch (error) {
    contextManager.emit('error',{message: error});
    return;
  }
  
  console.log(secret);
  let collectionName = commandArguments[0];
  db[collectionName].insert(secret);
  db.commit();
}

function addCollection(db,contextManager,args){

}

function showSecrets(db,contextManager){
  contextManager.emit('show-secrets',contextManager.db.selectAll());
}

function showCollections(db,contextManager){
  contextManager.emit('show-collections',contextManager.db.collections);
}

/**
 * Prints All the Commands and Descriptions of the current context.
 * Syntax = help 
 * @param {*} db 
 * @param {*} contextManager 
 */
function help(db,contextManager){
  contextManager.emit('help',contextManager.currentContext);
}

function quit(){
  process.exit();
}

let executors = [];

module.exports = function(db,contextManager){

 executors['add-self-help'] = new CommandSpecificHelpExecutor(db,contextManager,"Displays the help menu");
 executors['add-self-help'].syntax = `<name-of-command> ?`;

 executors['add-collection'] = new AddCollection(db,contextManager,'Adds a new collection');
 executors['add-collection'].syntax = `add -c <collection-name>`

 executors['add-secret'] = new AddSecret(db,contextManager,"Adds a new secret");
 executors['add-secret'].syntax = `add -s <collection-name> <required-field> [optionalfield:value]`;

 executors['quit'] = new Quit(db,contextManager,'Quits the program');
 executors['quit'].syntax = `quit`;

 executors['help'] = new Help(db,contextManager,'Display help menu');
 executors['help'].syntax = `help`;

 executors['show-secret'] = new ShowSecret(db,contextManager,'Display a secret with ID');
 executors['show-secret'].syntax = `show -s <collection-name> <secret-id>`;

 executors['show-secret-all'] = new ShowSecretAll(db,contextManager,'Display all the secrets with ID');
 executors['show-secret-all'].syntax = `show -s-all`;
  
 executors['show-collections-all'] = new ShowCollections(db,contextManager,'Display all the collections');
 executors['show-collections-all'].syntax = `show -c-all`;

 executors['clear-database'] = new ClearDatabase(db,contextManager,'Clears the contents of the database');
 executors['clear-database'].syntax = `clear-database`;

 executors['create-secret'] = new CreateSecret(db,contextManager,'Creates a new secret');
 executors['create-secret'].syntax = `create -s`;

 executors['create-secret-type'] = new CreateSecretType(db,contextManager,'Creates a new secret type');
 executors['create-secret-type'].syntax = `create -t`;

return executors;
}


class AbstractExecutor{

 constructor(db,contextManager,description = ""){
  this.db = db;
  this.contextManager = contextManager; 
  this.d = description;
 }

 set description(description){
  this.d = description;
 }

 get description(){
  return this.d;
 }

 set syntax(syntax){
  this.s = syntax;
 }

 get syntax(){
  return this.s;
 }

 /**
  * Fires the executor, this should be implemented by the subclass
  * @param {String} commandParameters to the specific command that this executor is used at.
  */
 fire(commandParameters){
  throw new Error('Executor@fire : Not Yet Implemented');
 }



}

/**
 * Provides a help trigger for each command.
 */
class CommandSpecificHelpExecutor extends AbstractExecutor{
 
 constructor(db,contextManager,description){
  super(db,contextManager,description);
 }

 /**
  * 
  * @param {String} commandName
  */
 fire(commandName){
  
  //look for the command on the context Manager
  let foundCommand = this.contextManager.currentContext.findCommand(commandName);

  if(!foundCommand){
   throw new SKError(`${commandName} not found`,'SK_COMMAND_NOT_FOUND');
  }

  if(foundCommand){
   //get the found commands executors
   this.contextManager.emit('command-help',foundCommand);//emits the command

  }

  //for command specific help we need the reference to the command
 }

}

class AddSecret extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
   }
  
   /**
    * 
    * @param {String} data to the command
    */
   fire(data){
       
    let collectionName = data[0];   

    if(data.length === 0) {
      this.contextManager.emit('error',{message: 'Parameter Required'});
      return;
    }

    let secret;
    try {
       secret = secretFactory.create(data);  
    } catch (error) {
      this.contextManager.emit('error',{message: error});
      return;
    }
    
    this.db[collectionName].insert(secret);
    this.db.commit();

   }
}

class AddCollection extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
   }
  
   /**
    * 
    * @param {String} collectionName to the command
    */
   fire(params = null){

    if(params === null){
      this.contextManager.emit('error','Collection Name is required');
      return;
    }
    let collectionName = params[0];
    //perform validation here

    this.db.createCollection(collectionName);
    this.db.commit();

   }
}

class Quit extends AbstractExecutor{
  constructor(db,contextManager){
    super(db,contextManager);
  }

  fire(){
    process.exit();
  }
}

class Help extends AbstractExecutor{
  constructor(db,contextManager){
    super(db,contextManager);
  }

  fire(){
    this.contextManager.emit('help',this.contextManager.currentContext);
  }
}

class ShowSecretAll extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
  }

  fire(){
    this.contextManager.emit('show-secrets',this.db.selectAll());
  }
}

class ShowSecret extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
  }

  fire(params = null){

    if(params === null){
      this.contextManager.emit('error',{message: 'Collection Name And Secret Id are required'});
      return;
    }

    if(params < 2){
      this.contextManager.emit('error',{message: 'Collection Name And Secret Id are required'});
      return;
    }

    let collectionName = params[0];
    let secretId = params[1];

    let res = this.db[collectionName].find({_id : secretId});

    res ? this.contextManager.emit('show-secret',res): this.contextManager.emit('error',`${collectionName} secret with id = ${secretId} not found`);
  }
}


class ShowCollections extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
  }

  fire(params = null){
    this.contextManager.emit('show-collections',this.db.collections);
  }
}

class ClearDatabase extends AbstractExecutor{
  constructor(db,contextManager,description){
    super(db,contextManager,description);
  }

  fire(){
    console.log('fired');
    let self = this;
    this.contextManager.emit('show-confirmation-dialog',{
      prompt:`This will clear the contents of the database? Are you sure you want to continue? Type Y or N`,
      callback: function(answer){
        if(answer.toUpperCase() === 'Y'){
          self.db.dropDB();
          self.contextManager.emit('info','Database Cleared');
          return;
        }
      }});
  }
}

class CreateSecret extends AbstractExecutor{
 constructor(db,contextManager,description){
  super(db,contextManager,description);
 }  

 fire(){
  //display a dialog to choose a secret type
  this.contextManager.emit('show-secret-type-menu');  
  //
  this.contextManager.emit('show-select-secret-type-dialog',function(answer){
   console.log('Logging Answer');
   console.dir(answer);
  });
 }
}


class CreateSecretType extends AbstractExecutor{
 constructor(db,contextManager,description){
  super(db,contextManager,description);
 }  

 fire(){
  //display a dialog to choose a secret type
  //
  this.contextManager.emit('secret-type.create',function(answer){
   console.log('Logging Answer');
   console.dir(answer);
  });
 }
}




