const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function auth(req,res,next){
     
    // check if token not exists
    const token=req.header('x-auth-token');
     if(!token){
       return  res.status(401).json({msg:'no token,authorization denied'});
     }

    // verify token
try {
    const decoded=jwt.verify(token,config.get('jwtSecret'));
    req.user=decoded.user;

    next();
    
} catch (err) {
    
   res.status(401).json({msg:'token is not valid'});
}

}