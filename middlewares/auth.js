require("dotenv").config();
const jwt = require("jsonwebtoken");
const status = require('http-status');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader) {
        req.error = "No token provided";
        return res.status(status.UNAUTHORIZED).send({ error: "No token provided"});
    }

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2) {
        req.error = "Token malformatted";
        return res.status(status.UNAUTHORIZED).send({ error: "Token malformatted"});
    }

    const [bearer, token ] = parts;

    if(!/^Bearer$/i.test(bearer)) {
        req.error = "Token malformatted";
        return res.status(status.UNAUTHORIZED).send({ error: "Token malformatted"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            req.error = "Token invalid";
            return res.status(status.UNAUTHORIZED).send({ error: "Token invalid"});
        }

        req.userName = decoded.name;
        return next();
    });

};