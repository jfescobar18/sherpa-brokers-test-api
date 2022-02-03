const bcrypt = require('bcrypt');

exports.cryptPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashWord = await bcrypt.hash(password, salt);
        return hashWord;
    }
    catch (error) {
        throw error;
    }
};

exports.comparePassword = async function (password, hashWord) {
    try {
        const match = await bcrypt.compare(password, hashWord);
        return match;
    }
    catch (error) {
        throw error;
    }
};