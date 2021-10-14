const express = require("express");
const router = express.Router(); //Router method use
const controller = require("../controller/user.control"); //Require controller path 
const {verifyTokenFn} = require('../config/jwt')


router.post("/addUser", controller.addUser);
router.put("/varifyuser", controller.varify); 
router.post("/login",controller.login); 
router.put("/edituser",verifyTokenFn,controller.editUser); 
router.delete("/deleteUser",verifyTokenFn,controller.deleteUser); 

module.exports = router;
