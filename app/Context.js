class Context{
  
  constructor(name,depth){
 
    if(!name || depth === undefined){
      throw new Error('Name and Depth are required');
    }
    this.name = name;
    this.depth = depth;
    this.contexts = [];//context can contain other contexts
    this.commands = [];
 
  }
 
  addCommand(cmd){
    this.commands.push(cmd);
  }
 
  findCommand(cmdName){
    return this.commands.find((cmd)=>{
      return cmd.name === cmdName;
    });
  }
 
  findContext(contextName){ 
   return this.contexts.find((context)=>{
    return context.name === contextName;
  });
 }
 
  addContext(context){
   this.contexts.push(context);
  }
 
 } 

//Statics

Context.DEPTH = {
  IMAGE_INIT: 0,
  LOGIN: 5,
  MAIN:10,
  DIALOG: 15
}

Object.freeze(Context.DEPTH);

class InitImage extends Context{
  constructor(){
    super('init-image',Context.DEPTH.IMAGE_INIT);
  }
}  

class Login extends Context{
  constructor(){
    super('login',Context.DEPTH.LOGIN);
  }
}  

module.exports = Context;
module.exports.InitImage = InitImage;
module.exports.Login = Login;

