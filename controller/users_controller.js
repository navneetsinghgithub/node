const { Validator } = require("node-input-validator");
const { tokengenerate } = require("../jwt/jsonwebtoken");
const users_model = require("../model/users_model")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const checkValidation = require("../helper/helper");
const twilio = require("twilio")


module.exports = {
    adduser: async (req, res) => {
        try {


            const v = new Validator(req.body, {
                name: "required",
                email: "required"

            })

            let errorResponse = await checkValidation(v)
            if (errorResponse) {
                return res.json(errorResponse)
            }


            const saltround = 10;
            const password = await bcrypt.hash(req.body.password, saltround);



            const adduser = await users_model.create({
                name: req.body.name,
                lastname: req.body.lastname,
                password: password,
                email: req.body.email,
                contact: req.body.contact,
            })
            const token = await tokengenerate(adduser._id);

            const updateresult = await users_model.findByIdAndUpdate({
                _id: adduser._id
            }, {
                token: token.token,
                logintime: token.time
            },
                { new: true });

            const otp = Math.floor(1000 + Math.random() * 1100)

            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            const Twilio = twilio(accountSid, authToken);
            var response = Twilio.messages
                .create({
                    to: "+918930116582",
                    from: "+12059273802",
                    body: `Your verification code is ${otp}`,
                })
                .then((message) => console.log(`Message SID ${message.sid}`))
                .catch((error) => console.error(error));


    const transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "fc9cf37b147594",
                    pass: "692d2d59fe7312"
                }
            });
            const info = await transport.sendMail({
                from: "navneet@gmail",
                to: req.body.email,
                subject: "forgot password link",
                text: "this is link",
                html: `${otp}`
            })



            return res.json({
                message: "add _users",
                status: 200,
                body: updateresult
            })

        } catch (error) {
            console.log(error, "error");
        }
    },
    login: async (req, res) => {
        try {
            const loggin = await users_model.findOne({
                email: req.body.email
            })
            if (!loggin) {
                return res.json({
                    message: "email or password is not correct",
                    status: 400,
                    body: {}
                })
            }
            else {
                if (loggin.email == req.body.email) {
                    const password = await bcrypt.compare(req.body.password, loggin.password);

                    if (!password) {
                        return res.json({
                            message: "password wrong",
                            status: 200,
                            body: {}
                        })
                    }
                    else {
                        return res.json({
                            message: "login success",
                            status: 200,
                            body: loggin,
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error, "error");
        }
    },
    finduser: async (req, res) => {
        try {
            const finduser = await users_model.find()
            return res.json({
                message: "find_user",
                status: 200,
                body: finduser
            })
        } catch (error) {
            console.log(error, "error");
        }
    }
}