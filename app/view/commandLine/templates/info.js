let ora = require('ora');
let logSymbols = require('log-symbols');

module.exports = function(text){
  
   return `
   **************************************************************************
     ${text}
   **************************************************************************
   
   `;
  
  }