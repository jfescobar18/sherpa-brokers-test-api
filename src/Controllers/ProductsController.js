const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const db = require("../Sequelize/database");
const { checkProductChanges } = require("../Utils/ComposeEmail")

exports.getProducts = async (req, res) => {
    try {
        const products = await db.Products.findAll();

        return res.status(HttpCodes.OK).jsonp({
            "products": products
        });
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await db.Products.findAll({
            where: {
                ProductId: req.params.ProductId
            }
        });

        return res.status(HttpCodes.OK).jsonp({
            "product": product.length > 0 ? product[0].dataValues : null
        });
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const product = db.Products.build(req.body);
        await product.save();

        return res.status(HttpCodes.OK).jsonp({
            "product": product,
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

exports.editProduct = async (req, res) => {
    try {
        checkProductChanges(req.body);
        
        await db.Products.update({
            ProductName: req.body.ProductName,
            ProductPrice: req.body.ProductPrice,
            CategoryId: req.body.CategoryId
        }, {
            where: {
                ProductId: req.body.ProductId
            }
        }).then(() => {
            return res.status(HttpCodes.OK).jsonp({
                "status": ResponseCodes.ProductEdited,
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

exports.removeProduct = async (req, res) => {
    try {
        await db.Products.destroy({
            where: {
                ProductId: req.body.ProductId
            }
        });

        return res.status(HttpCodes.OK).jsonp({
            "status": ResponseCodes.ProductDeleted
        })
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}
