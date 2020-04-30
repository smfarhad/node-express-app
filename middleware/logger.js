function log(req, rea, next) {
    console.log('Logging....');
    next()
}

module.exports = log;