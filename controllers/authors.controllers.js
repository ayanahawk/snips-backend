const Author = require('../models/Author.model');
const bcrypt =require('bcrypt');
const ErrorWithHttpStatus=require('../utils/ErrorWithHttpStatus'); 
const jwt=require('jsonwebtoken');

exports.signup = async (request, response, next) => {
    try {
       const hashedPassword= await bcrypt.hash(request.body.password, 2);
        await Author.insert({
            name: request.body.name,
            password: hashedPassword
        });
        response.status(201).send('Signed up')
    } catch (error) {
        next(error)
        console.log(error)
    }
}

exports.login = async (request, response, next) => {
//1. get author
try{
    const author=  await Author.select(request.body.name)
    //2. check if they exsit 
    if (!author) throw new ErrorWithHttpStatus('user not there', 404)
    
    //3 check if the password matches
    const isMatch= await bcrypt.compare(request.body.password, author.password);
    if(!isMatch) throw new ErrorWithHttpStatus('incorect password', 401); 

    const token=jwt.sign(author.name, process.env.JWT_SECRET)
    response.send({message:'Logged in', token});

}catch(err){
console.log(err)
next(err)
}

}