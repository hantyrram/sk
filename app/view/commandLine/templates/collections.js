module.exports = function(collections){

 let template = `
 **********************************************
 Collections
 **********************************************
 ${spread(collections)}
 
 `;

 return template;

}

/**
 * Spreads the data into rows
 * @param {Array} collections 
 */
function spread(collections){
 
  let i = 1;

  return collections.reduce(function(acc,c){
   
   return acc += ` ${i++} ${c} \r\n `;

  },'');

}