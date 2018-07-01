let ora = require('ora');
module.exports = function(text){
 
 console.log(text);
 let template =  `
  ---------------------------------------------------
    ${text}
  --------------------------------------------------- 
  `;

 return ora(template).fail();

 }