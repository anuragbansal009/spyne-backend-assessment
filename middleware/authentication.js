const userService = require('../services/user.services');
var jwt = require('jsonwebtoken');

const authentication = () => {
    return async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(400).json({ status: "failed", authenticated: false })
        }
        try {
            const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let email = decoded.user;
            if(email == null || email == undefined || email == ''){
                email = decoded.email;
            }
            else {
                email = email.email;
            }
            const getUserResponse = await userService.getUserByEmail(email);
            if (!getUserResponse) {
                return res.status(400).json({ status: "failed", authenticated: false });
            }
            next();
        }
        catch (err) {
            return res.status(400).json({ status: "failed", authenticated: false });
        }

    }
}

module.exports = authentication