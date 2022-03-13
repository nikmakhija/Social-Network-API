const router = require("express").Router();
const {
    getUsers, 
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/thought-controller");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;