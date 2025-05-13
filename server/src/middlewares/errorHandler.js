function errorHandler (err, _req, res, _next) {
   console.log(`Error: ${err.message}`)
   res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" })
};

module.exports = errorHandler;