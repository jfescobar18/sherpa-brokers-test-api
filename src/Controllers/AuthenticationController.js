const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const TokenService = require("../AuthMiddleware/TokenService");
const { cryptPassword, comparePassword } = require("../Utils/Cryptography");
const db = require("../Sequelize/database");

exports.login = async (req, res) => {
    try {
        let admin = await getAdminByUsername(req.body.AdminUsername).catch(error => { throw error });

        if (admin !== null && await comparePassword(req.body.AdminPassword, admin.AdminPassword)) {
            return res.status(HttpCodes.OK).jsonp({
                "status": ResponseCodes.AdminAuthenticated,
                "token": TokenService.createToken(admin, 15),
                "errors": null
            });
        }
        else {
            return res.status(HttpCodes.UNAUTHORIZED).jsonp({
                "status": ResponseCodes.InvalidCredentials,
                "token": null,
                "errors": null
            });
        }
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.addAdmin = async (req, res) => {
    try {
        req.body.AdminPassword = await cryptPassword(req.body.AdminPassword);
        const admin = db.Admins.build(req.body);
        await admin.save();

        return res.status(HttpCodes.OK).jsonp({
            "user": admin,
            "errors": null
        })
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.editAdmin = async (req, res) => {
    try {
        await db.Admins.update({
            AdminUsername: req.body.AdminUsername,
            AdminPassword: await cryptPassword(req.body.AdminPassword)
        }, {
            where: {
                AdminId: req.body.AdminId
            }
        }).then(() => {
            return res.status(HttpCodes.OK).jsonp({
                "status": ResponseCodes.AdminEdited,
                "errors": null
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.removeAdmin = async (req, res) => {
    try {
        await db.Admins.destroy({
            where: {
                AdminId: req.body.AdminId
            }
        });

        return res.status(HttpCodes.OK).jsonp({
            "status": ResponseCodes.AdminDeleted
        })
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

const getAdminByUsername = async function (AdminUsername) {
    try {
        const admin = await db.Admins.findAll({
            where: {
                AdminUsername: AdminUsername
            }
        });

        return admin.length > 0 ? admin[0].dataValues : null;
    }
    catch (error) {
        throw error;
    }
}