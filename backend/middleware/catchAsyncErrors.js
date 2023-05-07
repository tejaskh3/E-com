
// module.exports = (theFunc) = (req,res,next)=>{
//  Promise
//          .resolve(theFunc(req,res,next))
//          .catch(next);
// }

module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next))
    .then((result) => {
      theFunc(req,res,next);
      next();
    })
    .catch(next);
}

