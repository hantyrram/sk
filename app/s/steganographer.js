// writer.write(data); // writes data to the image
// reader.read(); //reads data from the image

const filesystem = require('fs');
const path = require('path');
//The encoder that encodes/decodes the data unto a buffer
const encoder = require('./encoder');
//Default Storage file to use if none is specified
const DEFAULT_STORAGE = path.resolve('data/store.bmp');
//Marks the beginning of the SK Data Structure
const DEFAULT_MARKER = '<<!--**!>>'
//Start on the 32nd byte of the file
const DEFAULT_OFFSET = 32;
//Buffer where the contents of the storage file is loaded into
var storageBuffer = null;
//The offset where to write the data(after metadata e.g. Marker,Length Of Data Number)
var writableOffset = 0; //the secret data's offset ??rename to dataOffset?
var isReady = false;
var secret;
var secret_max_length = 0;

class S{
 constructor(pathToFile = DEFAULT_STORAGE,marker = DEFAULT_MARKER){
  this.pathToFile = pathToFile;
  this.marker = marker;
  
 }


 ready(callback){
  
  var self = this;
  //init
  (async function(){

   try {
    storageBuffer = await initStorageBuffer(self.pathToFile); 

    if(markerFound(storageBuffer,self.marker) === false){
     
           console.log('Marker Not Found');
            
           let numBytesOfMarker = storageBuffer.write(self.marker,DEFAULT_OFFSET);
           
           console.log(`numBytesOfMarker = ${numBytesOfMarker}`);
     
           let offsetPlusNumBytesWritten = storageBuffer.writeUInt32BE(0,DEFAULT_OFFSET + numBytesOfMarker + 1);
     
           console.log(`numBytesOfWrittenInt = ${offsetPlusNumBytesWritten}`);
     
           writableOffset = offsetPlusNumBytesWritten + 1;
     
           console.log(`Writable Offset = ${writableOffset}`);
           isReady = true;
           secret_max_length = Math.floor((storageBuffer.length - writableOffset) / 4);//??
           self.write("{}");//initialize
           self.commit();
        }else{
           writableOffset = storageBuffer.indexOf(self.marker) + self.marker.length + 4 + 1 + 1;
           //check if there is existing data/secret by reading the length storage
           let dataLength = storageBuffer.readUInt32BE(storageBuffer.indexOf(self.marker) + self.marker.length + 1);
           
           if(dataLength > 0){//there is existing data
             //decode it
             secret = encoder.decode(storageBuffer,dataLength,writableOffset);
           }
        }
        secret_max_length = Math.floor((storageBuffer.length - writableOffset) / 4);//??divided by 4 when using the twoBitEncoder only
       
        isReady = true;
     
        // callback.call(self);
        callback(self);
   } catch (error) {
    console.log(error);
   }
   
  })().catch((err)=>{
   console.log(err);
  });
  
 }

 /**
  * Writes the secret string
  * @param {String} str - The secret string
  */
 write(str){
  
  if(isReady === false){
   throw new Error('S Not Ready');
  }

  if(str.length >= secret_max_length){
   throw new Error('Not enough storage');
  }

  storageBuffer.writeUInt32BE(str.length, storageBuffer.indexOf(this.marker) + this.marker.length + 1);
  
  storageBuffer = encoder.encode(str,storageBuffer,writableOffset);
  
  
 }

 /**
  * True if the S@ready function was invoked
  * @return {Boolean} - true if S is ready
  */
 get isReady(){
  return isReady;
 }

 /**
  * The secret string saved on the image file
  * @return {String} = The data as raw string
  */
 get data(){  
  return this.read();
 }

 /**
  * The maximum allowed length of the secret string
  * @return {Integer} = Maximum secret string length allowed
  */
 get secret_max_length(){
   return secret_max_length;
 }

 /**
  * Saves the secret to the image file
  */
 commit(){
  
  let ws = filesystem.createWriteStream(this.pathToFile);

  ws.on('error',(e)=>{
   console.log(e);
  });

  let ret = ws.write(storageBuffer);

 }

 /**
  * Reads the secret from the image file
  * @return {String} the secret text
  */
 read(){
  // let dataLengthOffset = storageBuffer.indexOf(this.marker) + this.marker.length + 1;
  // console.log(`@ Read dataLength = ${storageBuffer.readUInt32BE(dataLengthOffset)}`);
  // process.exit(0);

  if(isReady === false){
    throw new Error('S Not Ready');
  }

  let dataLengthOffset = storageBuffer.indexOf(this.marker) + this.marker.length + 1;
  secret = encoder.decode(storageBuffer,storageBuffer.readUInt32BE(dataLengthOffset),writableOffset); 
  return secret;
  

 }

}

// createSnapshot(){}

/**
 * Reads the file and returns a Promise which resolves to a content of the File in a Buffer object
 * 
 * @param {String} location of the file
 */
async function initStorageBuffer(location){
 
 return new Promise((resolve,reject)=>{

  
  filesystem.readFile(location,(err,content)=>{

   if(err){
    reject(err);
    return;
   } 

   resolve(content);
   
  });
   

 });
 
}

/**
 * Checks if the storage Buffer contains a marker
 * @param {Mixed} false if marker is not found on the storageBuffer, returns the offset of the marker if found
 */
function markerFound(storageBuffer,marker){ 
 if( storageBuffer.indexOf(marker) === -1){
  return false;
 }else{
  return true;
 }

}


function calculateStartOffset(storageBuffer,marker){

  //offset < storageBuffer - marker - 4
  //max secret size = (storageBuffer - writable offset) / 4

}

module.exports = S;