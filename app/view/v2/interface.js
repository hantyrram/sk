const readline = require('readline');

/**
 * Runs the image_setup_interface
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function image_setup_interface(inputHandler){
  const i = readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });

  i.question(`Enter the path to the image file > `,function(answer){
    inputHandler(answer);
    i.input.destroy();//relinguish the input stream after callback
  });  
}

/**
 * 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function login_interface(inputHandler){
  console.log('Login Interface View Opened');
}

/**
 * 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
function command_mode_interface(inputHandler){
  console.log('Command mode view Interface View Opened');
}




let interface = {};

/**
 * name Object contains the constant names of the available interface names
 */
interface.name = {};
interface.name.IMAGE_SETUP_INTERFACE = 'image_setup_interface';
interface.name.LOGIN_INTERFACE = 'login_interface';
interface.name.COMMAND_MODE_INTERFACE = 'command_mode_interface';

Object.freeze(interface.name);

const interfaces = [];
interfaces[interface.name.IMAGE_SETUP_INTERFACE] = image_setup_interface;
interfaces[interface.name.LOGIN_INTERFACE] = login_interface;
interfaces[interface.name.COMMAND_MODE_INTERFACE] = command_mode_interface;

/**
 * Runs / Displays an interface
 * @param {String} interfaceName 
 * @param {Function} inputHandler the function to be where the user input is passed to. MUST accept raw String
 */
interface.open = function(interfaceName,inputHandler){
  if(!interface.exists(interfaceName)) throw new Error('The Interface does not exist');
  interfaces[interfaceName](inputHandler);
}

/**
 * Checks if there is an interface with interfaceName
 * @param {String} interfaceName of the interface
 * @return {Boolean} true if interfaceName is one of the available interfaces, false if it does not exist
 */
interface.exists = function(interfaceName){
  return Boolean(interfaces[interfaceName]);
}




module.exports = interface;

