const { User } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.applicationId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { user: user._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: "user created, but found no user with that ID",
                    })
                    : res.json("Created the user 🎉")
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : User.findOneAndUpdate(
                        { user: req.params.userId },
                        { $pull: { user: req.params.userId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: "user created but no user with this id!",
                    })
                    : res.json({ message: "user successfully deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { tags: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { tags: { tagId: req.params.tagId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
