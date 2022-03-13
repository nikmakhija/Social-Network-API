const res = require("express/lib/response");
const {Thought, Users} = require("../models");
const thoughtController = {
    getThoughts(req, res){
        Thought.find().sort({createdAt:-1})
        .then((dbThoughtData)=>{res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    }, 
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .then((dbThoughtData)=>{
            if(!dbThoughtData){
                return res.status(404).json({message:"Nothing found"})
            }
            res.json(dbThoughtData)
        })
        .catch((err)=>{
            res.status(500).json(err);
        });
    },
    // create a thought
createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
},

// update thought
updatePizza({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbThoughtData => {
        if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
        }
        res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
},

// delete thought
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
},

// remove thought id from user's `thoughts` field
removeComment({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this user thought!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this thought!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// add a reaction to a thought
addReply({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { replies: body } }, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

// remove reaction from a thought
removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.commentId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No reaction with this id!' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
};

module.exports = thought-controller;
