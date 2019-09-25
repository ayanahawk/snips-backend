const jwt = require('jsonwebtoken');


module.exports = (request, response, next) => {
    //1.get the token
    const auth = request.headers.authorization;
    if (!auth) return response.send(401);
    const token = auth.split(' ')[1];
    //2.verify it 
    try {
      jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (err) {
        response.send(401)
    }

}