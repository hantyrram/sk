const interface = require('./interface');


function View(){}

//Copy interface names and make it a property of View
View.interfaceName = interface.name; 

/**
 * 
 * @param {String} interfaceName MUST be one of the View.constants 
 * @param {Function} inputHandler callback that accepts user input
 */
View.prototype.open = function(interfaceName,inputHandler){
  if(!interface.exists(interfaceName)) throw new Error('The Interface does not exist');
  interface.open(interfaceName,inputHandler);
}


module.exports = View;