const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../AuthMiddleware");
const AuthenticationController = require("../Controllers/AuthenticationController");

const routes = function () {
    router.route("/login")
        .post(AuthenticationController.login);

    router.route("/add-admin")
        .post(AuthMiddleware.ensureAuthenticated, AuthenticationController.addAdmin);

    router.route("/edit-admin")
        .post(AuthMiddleware.ensureAuthenticated, AuthenticationController.editAdmin);

    router.route("/remove-admin")
        .post(AuthMiddleware.ensureAuthenticated, AuthenticationController.removeAdmin);
    return router;
};

module.exports = routes;