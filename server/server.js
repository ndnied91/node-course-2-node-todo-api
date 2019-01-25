
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user')
var {Todo} = require('./models/todo')

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

//GET ALL
app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})   //success
  }, (e)=>{
    res.status(400).send(e);
    //reject
  })
})

//GET BY ID
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
})
});

//Delete route
app.delete('/todos/:id' , (req,res)=>{

var id = req.params.id; //get the id

if (!ObjectID.isValid(id)){
return res.status(404).send();
}//validation for ID


Todo.findByIdAndRemove(id).then((todo)=>{
  if(!todo){
    return res.status(404).send('Cant find this ID');
  }
    res.send(todo)

}).catch( ()=> {
        res.status(400).send('Invalid ID')})
})

//get id
//validate id
//check if todo is present
  //success, error
//have a catch


//POST ROUTE
app.post('/todos' , (req,res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc)=>{
      res.send(doc)
  },(e)=>{
    res.status(400).send(`Error occured` , e)
  });
});





app.listen(port, ()=>{
  console.log(`Started on at port ${port}`)
})


module.exports = {app};
