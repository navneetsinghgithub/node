const users_model = require("../model/users_model")
const jwt = require("jsonwebtoken")

module.exports = {
    tokengenerate: async (id) => {
        try {
            console.log(id,"lllllllll")
          const  secret_key = "123456"

            const token = await jwt.sign({ _id: id }, secret_key);
            const decode = await jwt.verify(token, secret_key);

            const time = Math.floor(Date.now() / 1000)
            const tim = await users_model.findByIdAndUpdate({
                _id: decode._id
            },
                { logintime: decode.iat, token: token },
                { new: true }
            )
            return { token: token, time: time }

        } catch (error) {
            console.log(error, "error");
        }
    }

}