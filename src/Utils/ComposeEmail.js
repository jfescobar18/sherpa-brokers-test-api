const db = require("../Sequelize/database");
const { ConsoleError } = require("./ConsoleConfig");
const { getCategoryName } = require("../Controllers/CategoriesController");
const { initEmail } = require("../Utils/Emailer");

exports.checkProductChanges = async (productBody) => {
    try {
        const _product = await db.Products.findAll({
            where: {
                ProductId: productBody.ProductId
            }
        });

        const product = _product.length > 0 ? _product[0].dataValues : null;

        let productHasChanged = false;
        let changesHistory = '';

        if (product.ProductName !== productBody.ProductName) {
            productHasChanged = true;
            changesHistory +=
                `<p>The name of this product has been changed<br>
            before: <b>${product.ProductName}</b>, now: <b>${productBody.ProductName}</b>`
        }

        if (product.ProductPrice !== productBody.ProductPrice) {
            productHasChanged = true;
            changesHistory +=
                `<p>The price of this product has been changed<br>
            before: <b>${product.ProductPrice}</b>, now: <b>${productBody.ProductPrice}</b>`
        }

        if (product.CategoryId !== productBody.CategoryId) {
            productHasChanged = true;
            changesHistory +=
                `<p>The price of this product has been changed<br>
            before: <b>${getCategoryName(product.CategoryId)}</b>, now: <b>${getCategoryName(productBody.CategoryId)}</b>`
        }

        if (productHasChanged) {
            initEmail(product.ProductName, changesHistory).then((res) => console.log(res)).catch((err) => console.log(err));
        }
    } catch (error) {
        console.log(ConsoleError, error.message);
    }
}