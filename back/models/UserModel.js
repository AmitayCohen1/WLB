const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const validator = require('validator');


const UserSchema = new Schema({
    userName: { 
        type: String, 
        required: true, 
    },
    age: { 
        type: Number,
    },
    organization: {
        type: String,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true

    }, 
    password: { 
    type: String, 
    required: true 
    }
})


UserSchema.statics.signup = async function (userName, age, organization, email, password) { 
    console.log('userName---', userName, 'age----', age, 'organization---' ,organization,  'email---',email,  'password---', password)
    if(!userName || !email || !password ) { 
        throw Error('all fiedls must be applied!')
    }
    if(!validator.isEmail(email)){ 
        throw Error('Unrecognized email pattern')
    }
    // if(!validator.isStrongPassword(password)){ 
    //     throw Error('Password is weak')
    // }

    const exist = await this.findOne({ email })
    if(exist) { 
        throw Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({userName, age, organization, email, password: hash});
    return user
}


UserSchema.statics.login = async function (email, password) { 
    if (!email || !password) {
        throw Error('All fields must be filled')
      }
      const user = await this.findOne({ email })
      if (!user) {
        throw Error('Incorrect email')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw Error('Incorrect password')
      }
      return user
}


const User = mongoose.model('User', UserSchema);
module.exports = User;