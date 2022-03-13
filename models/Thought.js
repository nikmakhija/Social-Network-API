const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions")
const dateFormat = require("../utils/dateFormat")

const thoughtSchema = new Schema(
    {
thoughtText: {
    type: String,
    required: "thought",
    minlength: 1,
    maximumLength: 280
},
createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
},
username: {
    type: String,
    required: true,
},
reactions: [
    reactionSchema
]
    },
    {
        toJson: {
       getters: true 
    },
    id: false
}
)
userSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})
const Thought = model("Thought",thoughtSchema)
module.exports = Thought 