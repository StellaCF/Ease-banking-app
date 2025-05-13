function notFound(req, _res, next) {
   const error = new Error("Page not Found");
   error.status =  404;
   next(error);
}

module.exports = notFound;