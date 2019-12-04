/**
 * Should be thrown from rest routes and be returned to API client with proper code, message and HTTP status.
 */
export default class RestApiException extends Error {
    status: number;

    constructor(status: number, message: string, public errorCode: ErrorCode = ErrorCode.UNKNOWN) {
        super(message);
        this.status = status;
    }
}

export enum ErrorCode {
    UNKNOWN = 'UNKNOWN',
    USER_PROFILE_NOT_FOUND = 'USER_PROFILE_NOT_FOUND',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    VALIDATION_ERROR = 'VALIDATION_ERROR'
}
