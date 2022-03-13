const {User, Thought} = require("../models")

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    


// get single user by id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

// create a new user
createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

// update a user
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// delete a user(bonus delete associated thoughts)
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};


// bonus get ids of users"thoughts" and delete them all
getUserById({ params }, res) 
{
    User.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }

// add a friend to friend list
addFriend({ params, body }, res) 
{
    console.log(body);
    Friend.create(body)
      .then(({ _id }) => {
        return FriendList.findOneAndUpdate(
          { _id: params.friendListId },
          { $push: { friends: _id } },
          { new: true }
        );
      })
      .then(dbFriendListData => {
        if (!dbFriendListData) {
          res.status(404).json({ message: 'No friend list found with this id!' });
          return;
        }
        res.json(dbFriendListData);
      })
      .catch(err => res.json(err));
  }

// remove a friend from friend list
removeFriend({ params }, res) 
{
    Comment.findOneAndDelete({ _id: params.friendId })
      .then(deletedfriend => {
        if (!deletedFriend) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        return FriendList.findOneAndUpdate(
          { _id: params.friendListId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
      })
      .then(dbFriendListData => {
        if (!dbFriendListData) {
          res.status(404).json({ message: 'No friend list found with this id!' });
          return;
        }
        res.json(dbFriendListData);
      })
      .catch(err => res.json(err));
  };

  module.exports = user-Controller;




