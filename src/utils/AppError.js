// Class for custom error handling.

// Status code:
// Informative Responses (100 – 199),
// Successful responses (200 – 299),
// Redirect messages (300 – 399),
// Client error responses (400 – 499),
// Server error responses (500 – 599)

class AppError {
    message
    statusCode

    constructor(message, statusCode = 400) {
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError