const jwt = require("jsonwebtoken");

const createToken = (email) => {
    const t = jwt.sign({
        data: 'foobar'
    }, 'SECRET', { expiresIn: '1h' });

    return t
}

const decodeToken = () => {
    try {
        var decoded = jwt.verify(token, 'SECRET');
        return decoded,false
    } catch(err) {
        return null,true
    }
}

module.exports = {
    createToken,
    decodeToken
}