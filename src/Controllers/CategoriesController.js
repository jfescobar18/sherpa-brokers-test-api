const HttpCodes = require("../Utils/HttpCodes");
const ResponseCodes = require("../Utils/ResponseCodes");
const db = require("../Sequelize/database");

exports.getCategories = async (req, res) => {
    try {
        const categories = await db.Categories.findAll();

        return res.status(HttpCodes.OK).jsonp({
            "categories": categories
        });
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await db.Categories.findAll({
            where: {
                CategoryId: req.params.CategoryId
            }
        });

        return res.status(HttpCodes.OK).jsonp({
            "category": category.length > 0 ? category[0].dataValues : null
        });
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.addCategory = async (req, res) => {
    try {
        const category = db.Categories.build(req.body);
        await category.save();

        return res.status(HttpCodes.OK).jsonp({
            "product": category,
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

exports.editCategory = async (req, res) => {
    try {
        await db.Categories.update({
            CategoryName: req.body.CategoryName
        }, {
            where: {
                CategoryId: req.body.CategoryId
            }
        }).then(() => {
            return res.status(HttpCodes.OK).jsonp({
                "status": ResponseCodes.CategoryEdited,
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

exports.removeCategory = async (req, res) => {
    try {
        await db.Categories.destroy({
            where: {
                CategoryId: req.body.CategoryId
            }
        });

        return res.status(HttpCodes.OK).jsonp({
            "status": ResponseCodes.CategoryDeleted
        })
    } catch (error) {
        return res.status(HttpCodes.BAD_REQUEST).jsonp({
            "status": ResponseCodes.Unexpected,
            "token": null,
            "errors": error.message
        });
    }
}

exports.getCategoryName = async (CategoryId) => {
    const _category = await db.Categories.findAll({
        where: {
            CategoryId: CategoryId
        }
    });

    const category = _category.length > 0 ? _category[0].dataValues : null;

    return category.ProductName;
}