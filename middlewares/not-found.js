// middleware func that will handle the 404 & send some kind of CUSTOM response

const notFound = (req,res) => {
    return res.status(404).send("Route does not exist")
}

module.exports = notFound;