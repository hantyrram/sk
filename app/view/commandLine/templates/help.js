
const chalk = require('chalk');
const os = require('os');
const logSymbols = require('log-symbols');

module.exports = function(commands){

  let header = 
    `
    ************************************************************************
      Command           | Description                                        
    ************************************************************************`;
     

  let content = 
    `
    ${
      spread(commands)
      
    }
    `;

  let footer =   
    `
     ${logSymbols.info + ' Type ? for command specific help menu'}
    *************************************************************************`;
    

  let template = header + os.EOL + content + os.EOL + footer; 
  
return template;

}


function spread(arr){

  return arr.reduce(function(acc,cmd){

   return acc += cmd.name.padEnd(15,' ') + '\t\t\t' + cmd.description + '\r\n' + '\t';

  },'\t');

}
