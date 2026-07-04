export default (req, res, next) => {
    try {
        const info = {
            url: req.url,
            method: req.method,
            date: new Date(),
        }
        res.locals.info = info
        next()
    } catch (error) {
        console.log(error)
        // res.status(500)
    }
}