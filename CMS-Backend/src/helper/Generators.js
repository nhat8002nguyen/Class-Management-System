const genRandomNumber = () => {
    return Math.round(
        Math.random() * 100000
        + Math.random() * 10000
        + Math.random() * 1000
        + Math.random() * 100
        + Math.random() * 10
    ); 
}

module.exports = {
    genRandomNumber: () => {
        return genRandomNumber();
    }
}
