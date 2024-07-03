class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        this.name = 'ApiError'; // Set a standard error name
    }
}

export default ApiError;
