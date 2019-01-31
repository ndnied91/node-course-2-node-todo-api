
const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {type: String ,
    required: true ,
    minLength:1 ,
    trim: true,
    unique: true, //wont be able to have 2 documents within the collectin with the same email
    validate:{
      validator:(value) =>{
          return validator.isEmail(value);
      },
      message : `{VALUE} is not a valid email`
    } //end of validate object
  },
  password:{
    type: String ,
    required: true,
    minlength: 6

  },
  tokens: [{
    access:{ type: String , required: true },
    token :{ type: String , required: true }
  }]
});


UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id' , 'email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString() , access}, 'secretSauce').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(()=>{
    return token;
  });
};



UserSchema.statics.findByToken = function(token){
  //will find the user with that token and return it
  var User = this; //model method
  var decoded;  //will store the decoded JWT values

    try{
      decoded = jwt.verify(token, 'secretSauce'); //will try to get the user
    } catch (e) {
      return  Promise.reject();
    } //end of catch block

    return User.findOne({ //this is the success case if it finds the use by the decoded token
      '_id' : decoded._id,
      'tokens.token': token,
      'tokens.access' : 'auth'
    });

};//end of findByToken


UserSchema.statics.findbyCredentials = function(email, password){

  var User = this;

  return User.findOne({email}).then((user)=>{
    if(!user){
    return Promise.reject(); //user doesnt exist
  }


  return new Promise((resolve, reject)=>{
    //comparing password provided and user.password
      bcrypt.compare(password, user.password, (err,res)=>{
          if(res) resolve(user);
            else reject();
      })
  })
})
}



UserSchema.pre('save', function(next){
  //get access to indivdual doc

  //GETS RAN BEFORE CREATING A NEW USER, DOESNT NEED TO BE CALLED IN ANY WAY BC ITS ON THE MODEL
  var user = this;

  if (user.isModified('password')){
    //hashpassword
    var password = user.password

    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(password, salt, (err,hash)=>{
        user.password = hash;
        next();
      })
    })


  } else
      next();
})

var User = mongoose.model('User' , UserSchema);



module.exports = {User}
