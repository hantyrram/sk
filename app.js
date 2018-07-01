const IDBConnection = require('./app/db/iDB');
const view = require('./app/view/commandLine');
const events = require('events');
const contextManager = require('./app/contextManager');


class SKError extends Error{
  constructor(message,code){
    super(message);
    super.message = message;
    super.code = code;
  }
}

global.SKError = SKError;

class InputHandler{
  
   constructor(contextManager){
    this.contextManager = contextManager;  
   }
  
   handle(input){
    this.contextManager.process(input);
   }
  
}  


let inputHandler = new InputHandler(contextManager);

contextManager.on('context-changed',function(context){
  
  if(context.name === 'init-image'){
    view.userImagePrompt(inputHandler);
  }

  if(context.name === 'login'){
    view.login(inputHandler);
  }

});

contextManager.on('main-context-changed',function(context){
  
  view.changePrompt(context.name);
  view.main(inputHandler);
});


contextManager.on('info',function(text){
  view.displayInfo(text);
});

contextManager.on('info-success',function(text){
  view.displayInfoSuccess(text);
});

contextManager.on('help',function(context){
  view.displayHelp(context.commands);
});

contextManager.on('command-help',function(command){
  view.displayCommandHelp(command);
});

contextManager.on('error',function(error){
 view.displayError(error); 
});

contextManager.on('show-collections',function(collections){
  view.displayCollections(collections); 
 });

contextManager.on('show-secrets',function(secrets){
view.displaySecrets(secrets); 
}); 

contextManager.on('show-secret',function(secret){
  view.displaySecret(secret); 
}); 

contextManager.on('show-secret-type-menu',function(){
  view.displaySecretTypeMenu();
});

contextManager.on('show-select-secret-type-dialog',function(callback){
 view.displaySelectSecretTypeDialog(callback);
});

contextManager.on('secret-type.create',function(callback){
 view.secretTypeCreate(callback);
});

contextManager.on('show-confirmation-dialog',function(objectWithPromptAndCallback){
  view.displayConfirmationDialog(objectWithPromptAndCallback); 
}); 


view.start(inputHandler);

contextManager.run(IDBConnection);



// contextManagerListener.on('message',function(message){
//   view.displayMessage(message); 
// });

// contextManagerListener.on('main-context-changed',function(context){
//  view.changePrompt(context.name);
// });

// contextManagerListener.on('help',function(commands){
//  view.displayHelp(commands);
// });

// contextManagerListener.on('secrets',function(secrets){
//  view.displaySecrets(secrets);
// });

// contextManagerListener.on('show-collections',function(collections){
//  view.displayCollections(collections);
// });


//display this, don't care how you display it, i'll just give you the handler of the input
// view.display('request_image',imagePathHandler);

//if no context display image
//view.start(inputHandler);





