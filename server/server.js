
var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user')
var {Todo} = require('./models/todo')

app.use(bodyParser.json());






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

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})   //success
  }, (e)=>{
    res.status(400).send(e);
    //reject
  })
})






app.listen(3000, ()=>{
  console.log(`Started on port 3000`)
})


module.exports = {app};
