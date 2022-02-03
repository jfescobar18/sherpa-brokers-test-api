const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../AuthMiddleware");
const CategoriesController = require("../Controllers/CategoriesController");

const routes = function () {
    router.route("/get-categories")
        .get(CategoriesController.getCategories);

    router.route("/get-category/:CategoryId")
        .get(CategoriesController.getCategory);

    router.route("/add-category")
        .post(AuthMiddleware.ensureAuthenticated, CategoriesController.addCategory);

    router.route("/edit-category")
        .post(AuthMiddleware.ensureAuthenticated, CategoriesController.editCategory);

    router.route("/remove-category")
        .post(AuthMiddleware.ensureAuthenticated, CategoriesController.removeCategory);
    return router;
};

module.exports = routes;