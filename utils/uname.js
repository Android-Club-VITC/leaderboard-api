function generateUname() {
    const digit = () => Math.floor(Math.random() * (9))
    return `${digit()+1}${digit()}#${digit()}${digit()}${digit()}${digit()}`;
}

module.exports = generateUname;