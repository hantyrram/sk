const dbConfig = require('./db.json');

(function(){
  global.DEFAULT_STORAGE = dbConfig.DEFAULT_STORAGE;
})()
