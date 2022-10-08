const mongoose = require('mongoose')

const msgContainerSchema = new mongoose.Schema({
    receiverEmailID: {type:String, required:true},
    messageArray: [
        {
          type: new mongoose.Schema(
            {
              message: String,
            },
            { timestamps: true }
          )
        }
      ],
    senderEmailID: {type:String, required:true},
}
,{
    timestamps: true,
});

module.exports = mongoose.model('msgContainer', msgContainerSchema)