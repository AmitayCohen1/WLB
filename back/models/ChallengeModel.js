const mongoose = require('mongoose');
const Schema = mongoose.Schema


//Children
const replySchema = new Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  reps: {
    type: Number,
  },
  fileName: {
    type: String
  }, 
  fileURL: { 
   type: String
  }
}, { timestamps: true });


//Parent
const challengeSchema = new Schema({
    title: {
      type: String,

    },
    userName: {
      type: String,

    },
    userEmail: {
      type: String,

    },
    description: {
      type: String,

    },
    reps: {
      type: Number,

    },
    fileName: {
      type: String
    }, 
    fileURL: { 
     type: String
    }, 
    replies: [replySchema] 
  }, { timestamps: true });




const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge





