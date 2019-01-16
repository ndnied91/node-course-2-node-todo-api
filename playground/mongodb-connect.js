///GIT CHECK



const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' ,  {useNewUrlParser: true} , (err,client)=>{
    if(err){
      return console.log("Unable to connect to database");
    }
      console.log("Connected succesfully to server");
      const db = client.db('TodoApp');
      //
      // db.collection('Todos').insertOne({
      //   text: "Adding something to datbase 3",
      //   completed: false
      //
      // }, (err,result)=>{
      //     if(err){
      //       return console.log(`Error occused` , err);
      //     }
      //     console.log(`succesfully added to database` ,
      //     JSON.stringify(result.ops, undefined , 2))
      //    })

      //CHALLENGE
       //create users collection
          //name, age , location

          db.collection('USERS').insertOne({
            name:"Mike",
            age: 27,
            location: "Maine"
          }, (err,result)=>{
            if(err){
            return console.log(`Error occured during insertion of item` , err);
          }
              console.log(`succesfully added to Users database`,
              JSON.stringify(result.ops, undefined , 2))
        })
          client.close();
//end of server call
});












































//
// const {MongoClient , ObjectID} = require('mongodb');
//
// MongoClient.connect('mongodb://localhost:27017/TodoApp' , {useNewUrlParser: true},  (err,client)=>{
//  if(err){
//    return console.log("Unable to connect to server");
//  }
//
//  console.log("Connected to mongodb server");
//  const db = client.db('TodoApp');
//
//   db.collection('Todos').insertOne({
//     text:'Clean room',
//     completed: false
//   }, (err,result)=>{
//     if(err){
//       return console.log(`Unable to insert todo` , err)
//     }
//
//     console.log(JSON.stringify(result.ops , undefined, 2));
// //end of collection call
//   });
//
// //Insert new doc into Users Collecton
// //name, age , location
//
//
// db.collection('Users').insertOne({
//   name:'Danny',
//   age: 27,
//   location: "New Jersey"
// }, (err, result)=>{
//   if(err){
//     return console.log(`Unable to add to database`, err);
//   }
// console.log(JSON.stringify(result.ops , undefined, 2));
//
// console.log(result.ops[0]._id.getTimestamp());
// })
//
//
//
// client.close();
//   //end of program
// });

///GIT CHECK
