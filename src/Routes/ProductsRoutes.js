const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../AuthMiddleware");
const productsController = require("../Controllers/ProductsController");

const routes = function () {
    router.route("/get-products")
        .get(productsController.getProducts);

    router.route("/get-Product/:ProductId")
        .get(productsController.getProduct);

    router.route("/add-Product")
        .post(AuthMiddleware.ensureAuthenticated, productsController.addProduct);

    router.route("/edit-Product")
        .post(AuthMiddleware.ensureAuthenticated, productsController.editProduct);

    router.route("/remove-Product")
        .post(AuthMiddleware.ensureAuthenticated, productsController.removeProduct);
    return router;
};

module.exports = routes;