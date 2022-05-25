const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
      thoughtText: {
          type:String,
          minLength:1,
          maxLength:280,
          required:true,
      }, 
      createdAt:{
        type:Date,
        default:Date.now

      },
      username: {
        type: String,
        required: true,
      },
      reactions:[Reaction],
      
    }, 
    {
      id: false,
    }
  );


  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;