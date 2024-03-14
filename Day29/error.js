function errorHandler(err, req, res, next) {
    console.error(err);
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
    if (err instanceof SyntaxError && err.status === 400) {
        statusCode = 400;
        errorMessage = 'Bad Request - Invalid JSON';
    } else if (err.name === 'ValidationError') {
        statusCode = 422;
        errorMessage = err.message;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        errorMessage = 'Unauthorized';
    }
    res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
