export default (req, res, next) => {
    try {
        if(['123', '456'].includes(req.body.password)){
            res.locals.data = 'Classified Data'
            res.locals.message = 'You have admin permissions'
            next()
        }else{
            res.locals.message = 'You do not have admin permissions'
            res.status(401).send(res.locals.message)
        }
       
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}