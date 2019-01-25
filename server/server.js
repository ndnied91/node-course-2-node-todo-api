
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user')
var {Todo} = require('./models/todo')

app.use(bodyParser.json());

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})   //success
  }, (e)=>{
    res.status(400).send(e);
    //reject
  })
})

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
  return res.status(404).send();
  }
  //validate ID using isValid , if not valid, respond with a 404 send back an empty body
  // findById , query a todos collection , success case , error case

  //findById
    //success
      // if todo - res send it back
        //if no todo, (id not found)  , send back a 404 with an empty body

Todo.findById(id).then((todo)=>{

      if(!todo){
        return res.status(404).send();
        //cant find ID case
      }
      else{
        res.send(todo);
        //success case
      }
}).catch((e)=>{
  res.status(400).send();
}
      //fail case




});

app.post('/todos' , (req,res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc)=>{
      res.send(doc)
  },(e)=>{
    res.status(400).send(`Error occured` , e)
  } )
})




app.listen(3000, ()=>{
  console.log(`Started on port 3000`)
})


module.exports = {app};
