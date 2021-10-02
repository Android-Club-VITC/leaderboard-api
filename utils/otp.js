function generateOtp() {
    const digit = () => Math.floor(Math.random() * (9))
    return `${digit()}${digit()}${digit()}${digit()}`;
}

module.exports = generateOtp;