export class StatusError extends Error {
    statusCode = 500

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, StatusError.prototype);
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message
    }

}
