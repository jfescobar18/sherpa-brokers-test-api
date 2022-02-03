const nodemailer = require("nodemailer");
const db = require("../Sequelize/database");
const path = require('path');
const fs = require("fs");

exports.initEmail = (ProductName, Body) => {
    return new Promise(function (resolve, reject) {
        try {
            const email = composeEmail(ProductName, Body);
            resolve(sendEmail(email.subject, email.text, email.body));
        }
        catch (error) {
            var reason = { "error": "nodemailer error", "message": error.message }
            reject(reason);
        }
    });
}

const composeEmail = (ProductName, Body) => {
    try {
        let emailComposed = {};

        emailComposed.subject = "A product has changed";
        emailComposed.text = `New changes on the product: ${ProductName}`;
        emailComposed.body = fs.readFileSync(path.join(__dirname, "./Mailing/Notify.html"), "utf8");
        emailComposed.body = emailComposed.body.toString();
        emailComposed.body = emailComposed.body.replace("{ProductName}", ProductName);
        emailComposed.body = emailComposed.body.replace("{Body}", Body);

        return emailComposed;
    }
    catch (error) {
        throw new Error(error);
    }
}

const sendEmail = async (subject, text, html) => {
    try {
        let config = {
            host: process.env.HOST_SMTP,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASSWORD_SMTP
            }
        };

        const transporter = nodemailer.createTransport(config);
        const admins = await db.Admins.findAll();
        let info;

        await Promise.all(admins.map(async (admin) => {
            console.log(admin);
            info = await transporter.sendMail({
                from: `Sherpa Brokers Test 🗃 <${process.env.USER_SMTP}>`,
                to: admin.dataValues.AdminUsername,
                subject: subject,
                text: text,
                html: html,
            });
        }));

        return info;
    }
    catch (error) {
        throw { "error": error.message };
    }
}