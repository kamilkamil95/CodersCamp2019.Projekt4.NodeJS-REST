import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";

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

