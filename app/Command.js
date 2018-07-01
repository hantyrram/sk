

/**
 * A representation of a command.
 * Command assigns a switch to an executor. Calls the correct executor based on the switch
 */
class Command{
  /**
   * 
   * @param {String} name of the command
   * @param {Function} executor the default executor to use.
   * @param {String} description of the command. This will show on the help display
   */
  constructor(name,description = ""){
    this.name = name;
    this.description = description;
    this.executors = [];
  }

  static get SWITCH_PREFIX(){
    return '-';
  }

  static get COMMAND_HELP_PREFIX(){
    return '?';
  }
 
  /**
   * Executes the command
   * @param {Array} parameters for the command
   */
  execute(parameters){
    // if(!this.executors['default']){throw new Error('Command has no executor!')}
    //check if there is a switch
    if(parameters.length !== 0){

      if(parameters[0].startsWith(Command.SWITCH_PREFIX)){
        let cmdSwitch = parameters[0];
        let theExecutor = this.executors[cmdSwitch];        
        if(!theExecutor){throw new SKError(`No executor for the provided switch ${cmdSwitch}`,'SK_NO_EXECUTOR')}

        parameters.splice(0,1);//remove switch
        theExecutor.fire(parameters);
        return;
       }

      if(parameters[0].startsWith(Command.COMMAND_HELP_PREFIX)){
       //execute this commands 'help' executor
       this.executors[Command.COMMAND_HELP_PREFIX].fire(this.name);        
       return;
      } 
    }
    
    this.executors['default']? this.executors['default'].fire(parameters): (()=>{throw new SKError(`${this.name} has No Executor!`,'SK_NO_EXECUTOR')})();
  }
 
  /**
   * @param {String} helpTemplate
   */
  set help(helpTemplate){
   this.help = helpTemplate;
  }
 
 /**
  * Return help
  */ 
  get help(){
   return this.help === undefined? this.description : this.help;
  }
 
 /**
  * Adds an executor for a given command switch. This method also creates a 1 time setDefault() method on the fly,
  * which can be chained after calling addExecutor. E.g. addExecutor(executor,'/s').setDefault() sets the 
  * executor as the default executor.
  * @param {Function} executor - the function to execute
  * @param {String} cmdSwitch - Optional. the switch for the command. MUST start with '/'
  */ 
  addExecutor(executor,cmdSwitch = null){   
    
    if(cmdSwitch !== null){
      //accept - , ? prefix for switch
      if(!Command.isValidSwitch(cmdSwitch)) {throw new SKError('Invalid Command Switch','SK_COMMAND_INVALID_SWITCH')} 

        this.executors[cmdSwitch] = executor;
        
        this.setDefault = ()=>{//add a chainable setDefault method to Command
          this.executors['default'] = executor;
          this.setDefault = null;
        }
      return this;
    }
    //if no cmdSwitch is set for the added executor, set key to 'default'
    //subsequent call to addExecutor without cmdSwitch value will override the 'default' executor
    //default executor is called when calling the command without the cmdSwitch
    this.executors['default'] = executor; 
    this.setDefault = ()=>{//add a chainable setDefault method to Command
      this.executors['default'] = executor;
      this.setDefault = null;
    }
    //allow chaining
    return this;
  }
  
  /**
   * Sets the Commands help switch executor. E.g. add ?, displays the help for add command.
   * @param {Executor} executor 
   */
  setCommandHelpExecutor(executor){
    this.executors[Command.COMMAND_HELP_PREFIX] = executor;
    return this;
  }

  static isValidSwitch(cmdSwitch){
    if(cmdSwitch.startsWith(Command.SWITCH_PREFIX)){
      return true;
    }
    return false;
  }

  /**
   * Sets the default executor of the command. Default executor is called when there is no command switch supplied.
   * @param {Function} executor 
   */
  setDefaultExecutor(executor){
    this.executors['default'] = executor;
  }
 
 }

 module.exports = Command;