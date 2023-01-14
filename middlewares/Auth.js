module.exports = async (req, res, next) => {
    let appKeyFromHeader = req.header('App-Key')
    let appKeyFromSystem = process.env.APP_KEY || '67779060809760061051'

    if (appKeyFromHeader !== appKeyFromSystem) {
        return res.status(401).json({
            success: false,
        })
    }

    return next()
}
