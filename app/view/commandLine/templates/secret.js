const colors = require('colors');
const os = require('os');

module.exports = function(data){
 
 let template = 
    `-----------------------------------\n${spread(data)}-----------------------------------`;
 
  return template;
 
 }
 
 
 function spread(data){
    let str = ``;
    
    data.forEach(function(element) {
      //get field names
      let fieldNames = Object.getOwnPropertyNames(element);
      fieldNames.forEach((fname)=>{
       str += `${fname} | ${element[fname]} \n`; //e.g. _id > 1 \r\n
      });
     
    });

    return str;
 }
 