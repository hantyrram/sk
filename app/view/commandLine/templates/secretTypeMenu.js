
const chalk = require('chalk');
const os = require('os');
const logSymbols = require('log-symbols');

module.exports = function(){
 let str =  `

 ************************************************************************
  1 Username And Password
  2 ATM Pin  
  ${chalk.green(logSymbols.info)} Usage: Type 1 for Username and Password
 `;

 return str;
   
}


