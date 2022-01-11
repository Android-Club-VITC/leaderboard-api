function generateOtp() {
    const digit = () => Math.floor(Math.random() * (9))
    return `${digit() % 8 + 1}${digit()}${digit()}${digit()}`;
}

module.exports = generateOtp;