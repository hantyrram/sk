const IDBConnection = require('../../../app/db/iDb');
const idbConnection = new IDBConnection();

idbConnection.on('error',function(err){
  console.log(err.message);
});

idbConnection.on('ready',function(idb){
  // console.log(idbConnection.usernamePassword.find({username:'uname',password:'mypas'}));
  // console.log(idbConnection.collections);
  // idbConnection.dropDB();
  // idbConnection.usernamePassword.drop();
  // idbConnection.usernamePassword.drop();
  console.log(idb.selectAll());
  // idb.createSnapshot();
  // idb.loadFromBackup(`data/snap1521657465266.bck`);
  // console.dir(idbConnection.usernamePassword);
  // // console.log(idbConnection.selectAll());
  // // // // console.log(idbConnection.removeCollection('id'));
  // // // // console.log(idbConnection.removeCollection('label'));
  // // // // // console.log(idbConnection.removeCollection('value'));
   // idbConnection.createCollection('usernamePassword');
   // idbConnection.createCollection('creditDebitPin');
  // // // //  // idbConnection.usernamePassword.deleteOne({_id: 2});
  // // // // // console.log(idbConnection.usernamePassword.updateOne({_id:1},{$set:{username:'bago na'}}));
  // // // // // // console.log(idbConnection.selectAll());
  // idbConnection.createCollection('usernamePassword');
  // let i = 1;
  // while(i < 300){
    // idbConnection.usernamePassword.insert({username:'uname',password:'mypass'});  
    // idbConnection.commit();
  //   console.log(i++);
  // }
  
  // idbConnection.commit();
  // console.log('Done');
  // idbConnection.usernamePassword.insert({username:'other',password:'mypass2'});
  
  // // // idbConnection.usernamePassword.insert({username:'uname',password:'mypass'});
  // // idbConnection.usernamePassword.insert({username:'uname',password:'mypass4'});
  // console.log(idbConnection.selectAll());
  // idbConnection.usernamePassword.insert({username:'unamxe',password:'mypasses'});
  // idbConnection.usernamePassword.insert({username:'unammmxe',password:'mypasseees'});
  // idbConnection.commit();
  // console.log(idbConnection.usernamePassword.selectAll());
});

idbConnection.connect();