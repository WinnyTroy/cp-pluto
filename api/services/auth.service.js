
exports.check = async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        console.log(res.JWTDecodedData)
        resolve(res.JWTDecodedData)
    })
}