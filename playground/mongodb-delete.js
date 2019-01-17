//git check

const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
 if(err){
   return console.log("Unable to connect to server");
 }
 const db = client.db('TodoApp');

 console.log("Connected to mongodb server");


//deleteMany
// db.collection('Todos').deleteMany({text:'Add to database'}).then((result)=>{
//   console.log(result)
// })
//deleteOne
// db.collection('Todos').deleteOne({text:'Adding something to datbase'}).then((result)=>{
//   console.log(result)
// })

//findOneAndDelete
// db.collection('Todos').findOneAndDelete({text:'Adding something to datbase'}).then( (result)=>{
//   console.log(result)
// })


//look for duplicates , deleteMany
            //use findOneAndDelete

  db.collection('USERS').deleteMany({name:'Kevin'}).then((result)=>{
  console.log(result)
  })

  db.collection('USERS').deleteOne({
    _id: new ObjectID("5c3fbe3985b12a2da8e78f19")
  }).then((result)=>{
    console.log(result)
  })



client.close();
  //end of program
});
