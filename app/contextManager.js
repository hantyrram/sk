const {EventEmitter} = require('events');
const SecretFactory = require('./model/SecretFactory');
const IDBConnection = require('./db/iDB');
const Context = require('./Context');
const Command = require('./Command');
const executors = require('./executors');
const commands = require('./commands');
const contexts = require('./contexts');
const assert = require('assert');
/**
* Processes the input entered by the user. Handles the contexts. Emits context changes, that can be listened to.
*/
class ContextManager extends EventEmitter{
 /**
  * 
  * @param {Context} mainContext with name = 'main' required
  */
 constructor(initialContext = null){
   super();   
   this.db = null;
   this.dbConnection;
   this.contexts = []
   this.previousContext = null;
   this.currentContext = initialContext;
 }

 setDB(db){
   if(!this.db){
    this.db = db;
   }   
 }

 /**
  * sets the current context
  */
 setContext(context){
   if(!(context instanceof Context)){
     throw new Error('ContextManager@setContext: context should be of type Context');
   }
   this.previousContext = Object.create(this.currentContext || null);   
   this.currentContext = context;

   if(this.currentContext.depth >= Context.DEPTH.MAIN){    
    this.emit('main-context-changed',this.currentContext);      
    return;
   }
   this.emit('context-changed',this.currentContext);
 }

 /**
  * 
  * @param {String} string - command name
  */
 isValidCommand(string){

   return this.currentContext.findCommand(string);
     
 }


 process(userInput){
  if(this.currentContext !== null){   
    if(this.currentContext.name === 'init-image'){
      //input should be a path to the image
      //we will accept no value
      if(!userInput){
        this.emit('info','No image path provided');
        this.dbConnection = new IDBConnection(userInput);
        this.emit('info-success','Using default image on data store');
        this.setContext(new Context.Login());
      }else{//if input is provided
       let fs = require('fs');
       //Check File Access and Existence
       fs.access(userInput,fs.constants.R_OK && fs.constants.W_OK,(err)=>{
         if(err){
           if(err.code === 'ENOENT'){
             this.emit('error',{message:'Image File Not Found!'});
           }else if(err.code === 'EPERM'){
             this.emit('error',{message:'No Permission to read or write to file!'});
           }else{
             this.emit('error',err);
           }
           this.emit('context-changed',this.currentContext); //re-emit the same context      
         return;   
         } 
         this.dbConnection = new IDBConnection(userInput);
         this.setContext(new Context.Login());
       });
      }
      return;
    }

    if(this.currentContext.name === 'login'){
      //process the input
      //???? process login
      //???? remove this, this is only to emitate a login error
      if(userInput === 'force-error'){
        this.emit('error',{message: 'Login Failed!'});
        this.setContext(this.currentContext);
        return;
      }

      this.emit('info-success','Login Not Yet Implemented! Login Successful!');

      this.dbConnection.on('error',(err)=>{
        this.emit('error',err);
      });

      this.dbConnection.on('ready',(db)=>{
        this.emit('info-success','Database Connected!');
        this.executors = executors(db,this);
        this.commands = commands(this.executors);
        this.contexts = contexts(this.commands);
        this.setContext(this.contexts['main']);
      });

      this.dbConnection.connect();
    }

      //check the current context is past login e.g. Main
    if(this.currentContext.depth > Context.DEPTH.LOGIN){
      let arr = userInput.trim().split(' ');
      let cmd = this.currentContext.findCommand(arr[0]);
      if(!cmd){
      this.emit('invalid-command',{message:arr[0] + ' Is not a valid command!'});
      return;
      }
      arr.shift();//remove command name, 
      let params = arr;

      // cmd.execute(params); 
      try {
       cmd.execute(params); 
      } catch (error) {
       
       this.emit('error',error);
      }
      
    }
  }
    
 }

 /**
  * Starts The Context Manager. Sets the initial context. 
  * 'context-change' listeners will be notified.
  */
 run(){
   this.setContext(new Context.InitImage());//emits context-change during run
 }

}


let contextManager = new ContextManager();

module.exports = contextManager;
