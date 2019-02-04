require('./config/config');

const _ = require('lodash');

var express = require('express')
var app = express()
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user')
var {Todo} = require('./models/todo')
const bcrypt = require('bcryptjs')

var {authenticate} = require('./middleware/authenticate');

app.use(bodyParser.json());

const port = process.env.PORT;

//GET ALL
app.get('/todos', authenticate, (req,res)=>{
  Todo.find({
    _creator: req.user._id
  }).then((todos)=>{
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


//UPDATE A TODO ITEM
app.patch('/todos/:id' , (req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  console.log('body ' , body)

  if (!ObjectID.isValid(id)){
  return res.status(404).send();
  }//validation for ID

  if(_.isBoolean(body.completed)&& body.completed){
    //if its a boolean and its true
    body.completedAt = new Date().getTime(); //will show when its done
  } else {
      body.completed = false;
      body.completedAt = null;
  }

      //this will update the database
        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
          if( !todo) {
            return res.status(404).send();
          }
          res.send({todo})

        }).catch((e)=>{
          res.status(400).send()
        })
});







//POST ROUTE
app.post('/todos' , authenticate,  (req,res)=>{
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })
  todo.save().then((doc)=>{
      res.send(doc)
  },(e)=>{
    res.status(400).send(`Error occured` , e)
  });
});



app.post('/users' , (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User({
    email : body.email,
    password: body.password
  })


  //model methods , called on User
//    instance methods  user.generateAuthToken adds token to indivdual user
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
})

//get route to get all users from database
app.get('/users', (req,res)=>{
  User.find().then((user)=>{
    res.send({user})   //success
  }, (e)=>{
    res.status(400).send(e);
    //reject
  })
})

//PRIVATE ROUTING
app.get('/users/me', authenticate , (req,res)=>{
  res.send(req.user);
});


//POST  , /users/login
    //sending along emial and plain text password
      //we need to try and find the user matching that email
      //then match the password to the hashed password


/////////////////
app.post('/users/login' , (req,res)=>{
  var body = _.pick(req.body, ['email' , 'password']);

  User.findbyCredentials(body.email, body.password).then((user)=>{
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth', token).send(user);
      });
      //end of gen auth token call
  }).catch((e)=>{
    res.status(400).send('unable to find the user')
  })
})


//LOG OUT PRIVATE ROUTE
app.delete('/users/me/token', authenticate, (req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  } , ()=> {
    res.status(400).send();
  })
})




///APP LISTENER
app.listen(port, ()=>{
  console.log(`Started on at port ${port}`)
})

module.exports = {app};

















/// create a new user
//wipe todo database
