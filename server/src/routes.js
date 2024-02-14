const { Router } = require("express");
const controller = require('./controller');

// create router object
const router = Router();

// add routes to the router object
router.get("/", controller.getUsers)
router.post("/", controller.addUser);
router.get("/login", controller.checkLogin);
router.get("/:id", controller.getUserById);
router.delete("/:id", controller.deleteUserById);


module.exports = router;