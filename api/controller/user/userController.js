const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const USER = require("/home/decodeup/Desktop/api/model/user.js");


exports.secure = async function (req, res, next) {
    try {
        var token = req.headers.authorization
        if (!token)
            return res.status(401).json({ Status: false, message: "Token not found" });
            
        var decode = jwt.verify(token, 'Secretkeyhnrhrthtrhtrhtrreg')
        // console.log(decode);
        
        if (!decode || !decode.id)
            return res.status(401).json({ Status: false, message: "Token not valid" });

        var checkuser = await USER.findById(decode.id)
        req.userId = decode.id
        if (!checkuser)
            return res.status(401).json({ Status: false, message: "Token not found" });

        next();
    } catch (err) {
        return res.status(500).json({ Status: false, message: 'Token is invalid' });

    }
}

exports.Login = async function (req, res, next) {
    try {
        console.log(req.body, "req.body");
        if (!req.body.Email)
            return res.status(401).json({ Status: false, message: "please Enter Your Email" });

        const checkuser = await USER.findOne({ Email: req.body.Email });
        // console.log(checkuser, "checkuser");

        if (!checkuser)
            return res.status(404).json({ Status: false, message: "User not found" });

        var verifypass = await bcrypt.compare(
            req.body.password,
            checkuser.password
        );
        // console.log(verifypass, "verifypass");
        let token = await jwt.sign({ id: checkuser._id }, 'Secretkeyhnrhrthtrhtrhtrreg')
        if (verifypass) {
            return res.status(200).json({ Status: true, message: "User login Sucessfully", checkuser, token });
        } else {
            return res.status(404).json({ Status: false, message: "Password Not Match" });
        }
    } catch (err) {
        return res.status(500).json({ Status: false, message: err.message });
    }
}   