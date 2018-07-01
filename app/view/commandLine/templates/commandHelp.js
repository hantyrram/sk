
const chalk = require('chalk');
const os = require('os');
const logSymbols = require('log-symbols');

module.exports = function(command){

  let header = 
    `
    ************************************************************************
      ${command.name}                
    ************************************************************************`;
     

  let content = 
    `
    ${
      spread(command)
      
    }
    `;

  let footer =   
    `
     ${logSymbols.info + ' Type ? for command specific help menu'}
    *************************************************************************`;
    

  let template = header + os.EOL + content + os.EOL + footer; 
  
return template;

}


function spread(command){

  //get the executors of the command
  let executors = command.executors;  
  let str = ''; 

  for(let k in executors){
    //k is the commandSwitch executors is an associative array
    str += `\t${k} ${executors[k].d} ${os.EOL} \t\t :${executors[k].s} ${os.EOL}`;//s is syntax
  }

  return str;
}
