const router = require("express").Router()
const { createUser,
    getUsers,
    deleteUser
} = require("../controller/user.controller")

router.post("/", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router