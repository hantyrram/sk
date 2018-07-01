'use strict';

let SecretFactory = {};

SecretFactory.create = function(parameters){
  let collectionName = parameters[0]; //always take first item as the collection name
  
  parameters.splice(0,1);

  let secret;

  switch(collectionName){
    case 'username-password': return secret = usernamePassword(parameters);
  }
  
}

/**
 * Creates a username-password secret object based on the provided array
 * @param {*} arr 
 */
function usernamePassword(arr){
  let document = {
    
    username: arr[0],
    password: arr[1],
    description: arr[3] || ''
    }
 
  
  if(arr.length > 3){
    
    arr.splice(0,3);

    processUserDefinedFields(document,arr);
   
  }

  return document;  
}

/**
 * 
 * @param {Object} document the document where to add the remainingParameters to
 * @param {Array} remainingParameters the array containing the remaining optional data that aren't required by the given secret.  
 */
function processUserDefinedFields(document,remainingParameters){
  for(let k in arr){
    //parse the user defined input e.g. account=abc.com
    let fieldValuePair = arr[k].split("="); //['account','abc']

    if(fieldValuePair.length !== 2){//no equal sign
      throw new Error('Invalid Format. Format should be label=value pairs');    
    }
    document[fieldValuePair[0]] = fieldValuePair[1]; //e.g. document.account = abc    
  }
}

module.exports = SecretFactory;



