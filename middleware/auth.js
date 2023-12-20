const secret_key = "123456"
const jwt = require("jsonwebtoken")
const users_model = require("../model/users_model")

module.exports = {
    auth: async (req, res, next) => {

        let token
        if (req.header.authorization && req.header.authorization.startswith("Bearer")) {
            try {
                token = req.header.authorization.split(" ")
                const decode = await jwt.verify(token, secret_key);
                const user = await users_model.findOne({ _id: decode._id, logintime: decode.iat })
                if (user) {
                    req.user = user
                    next()
                }
                else {
                    return res.json({
                        messaage: "login first"
                    })
                }

            } catch (error) {
                console.log("invalid signature");
                return res.json({
                    message: "invalid token"
                })
            }
        }

    }
}