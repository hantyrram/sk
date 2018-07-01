const colors = require('colors');

module.exports = function(data){
 
 let template = 
    `
    *****************************************************************************
                                Username And Passwords
    *****************************************************************************
    ${
      colors.green(spread(data))
    }
    *****************************************************************************
    `;
 
  return template;
 
 }
 
 
 function spread(data){
  
   return data['username-password'].reduce(function(acc,s){
 
    return acc += s._id + '\t\t\t' + s.username.padEnd(15,' ') + '\t\t\t' + s.password + '\r\n' + '\t';
 
   },'\t');
 
 }
 