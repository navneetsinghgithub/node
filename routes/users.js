const  express = require("express")
const router = express.Router();
 const controller = require("../controller/users_controller")


router.post('/adduser',controller.adduser);
router.post('/login',controller.login);
router.get('/finduser',controller.finduser);



 module.exports = router;