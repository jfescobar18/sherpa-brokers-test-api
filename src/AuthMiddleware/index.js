const jwt = require('jwt-simple');
const moment = require('moment');
const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");

exports.ensureAuthenticated = function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(HttpCodes.FORBIDDEN).jsonp(ResponseCodes.AuthHeaderMissed);
        }

        const token = req.headers.authorization.split(" ")[0];
        const payload = jwt.decode(token, process.env.TOKEN);

        if (payload.exp <= moment().unix()) {
            return res.status(HttpCodes.UNAUTHORIZED).jsonp(ResponseCodes.ExpiredToken);
        }

        req.user = payload.sub;
        next();
    }
    catch (error) {
        return res.status(HttpCodes.UNAUTHORIZED).jsonp(ResponseCodes.InvalidToken);
    }

}

exports.ValidateTemporalToken = function (token) {
    try {
        const payload = jwt.decode(token, process.env.TOKEN);
        return !(payload.exp <= moment().unix());
    } catch (error) {
        throw { "error": error.message }
    };
}