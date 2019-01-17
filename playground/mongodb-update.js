//git check

const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
 if(err){
   return console.log("Unable to connect to server");
 }
 const db = client.db('TodoApp');

 console.log("Connected to mongodb server");

//UPDATING COLLECTIONS

db.collection('USERS').findOneAndUpdate({
   _id: new ObjectID('5c3fb921e473ca2d58bdd9b5')},
   {$set: { name: 'Chester'  }  , $inc: {'age' : 1} }


   ,{ returnOriginal: false } )

  .then( (result)=>{
    console.log(result)
});


client.close();
  //end of program
});
