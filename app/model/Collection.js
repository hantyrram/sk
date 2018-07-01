function Collection(db,collectionName){  
  this.db = db;
  this.collectionName = collectionName;
}

Collection.prototype.save = function(){
  this.db.createCollection(this.collectionName);
}

module.exports = Collection;