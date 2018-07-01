const readline = require('readline');

/**
 * Runs the image_setup_dialog
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function image_setup(inputHandler){
  const i = readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });

  i.question(`Enter the path to the image file > `,function(answer){
    inputHandler.handle(answer);
    i.input.destroy();//relinguish the input stream after callback
  });  
}

/**
 * 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function login(inputHandler){
  console.log('Login dialog View Opened');
}

/**
 * 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function command_mode(inputHandler){
  console.log('Command mode view dialog View Opened');
}

/**
 * Username And Password Secret Form.
 * 
 * @param {Function} submit the function where the user input is passed to. MUST accept raw String
 * 
 */
function add_username_password(parent,submit){
  
  let inputFields = {};

  const i = readline.createInterface({
    input: process.stdin,
    output: process.stdout    
  });

  i.on('SIGNINT',function(){
    i.question('Are you sure you want to exit? ', (answer) => {
      if (answer.match(/^y(es)?$/i)) i.close();
    });
  });

  let usernamePromise = function(){
    return new Promise(function(resolve,reject){
      i.question(`Enter username : `,function(answer){
        if(answer.length !== 0){
          inputFields.username = answer;
          resolve(inputFields);
        }
      });
    });
  }

  let passwordPromise = function(inputFields){

    return new Promise(function(resolve,reject){
      i.question(`Enter password : `,function(answer){
        if(answer.length !== 0){
          inputFields.password = answer;
          resolve(inputFields);
        }
      });
    });
  }

  
  let domainPromise = function(inputFields){

    return new Promise(function(resolve,reject){
      i.question(`Enter the domain where the username and password is used : `,function(answer){
        if(answer.length !== 0){
          inputFields.domain = answer;
          resolve(inputFields);
        }
      });
    });
  }

  usernamePromise().then(passwordPromise).then(domainPromise).then(function(inputFields){
    i.input.destroy();
    submit(inputFields);    
    if(parent){
      parent.resume();
    }
  });
  
 
}




let dialog = {};

/**
 * name Object contains the constant names of the available dialog names
 */
dialog.name = {};
dialog.name.IMAGE_SETUP_DIALOG = 'image_setup';
dialog.name.LOGIN_DIALOG = 'login';
dialog.name.COMMAND_MODE_DIALOG = 'command_mode';
dialog.name.ADD_USERNAME_PASSWORD_DIALOG = 'add_username_password';

Object.freeze(dialog.name);

const dialogs = [];
dialogs[dialog.name.IMAGE_SETUP_DIALOG] = image_setup;
dialogs[dialog.name.LOGIN_DIALOG] = login;
dialogs[dialog.name.COMMAND_MODE_DIALOG] = command_mode;
dialogs[dialog.name.ADD_USERNAME_PASSWORD_DIALOG] = add_username_password;

/**
 * Runs / Displays an dialog
 * @param {Interface} parent the parent interface that this dialog will relinguish it's control to
 * @param {String} dialogName 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
dialog.open = function(parent,dialogName,inputHandler){
  
  if(!dialog.exists(dialogName)) throw new Error('The dialog does not exist');
  dialogs[dialogName](parent,inputHandler);
}

/**
 * Checks if there is an dialog with dialogName
 * @param {String} dialogName of the dialog
 * @return {Boolean} true if dialogName is one of the available dialogs, false if it does not exist
 */
dialog.exists = function(dialogName){
  return Boolean(dialogs[dialogName]);
}




module.exports = dialog;

