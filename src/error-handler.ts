import {StatusCodes} from 'http-status-codes';

export interface IErrorResponse {
    statusCode: number;
    message: string;
    error: string;
    comingFrom: string;
    serializedErrors(): IError;
}   

export interface IError {
    statusCode: number;
    message: string;
    error: string;
    comingFrom: string;
}

export abstract class CustomError extends Error {
    abstract statusCodes: number;
    abstract status: string;
    comingFrom : string;

    constructor( message: string, comingFrom: string) {
        super(message);
        this.comingFrom = comingFrom;
    }

    serializedErrors(): IError {
        return {
            statusCode: this.statusCodes,
            message: this.message,
            error: this.status,
            comingFrom: this.comingFrom
        }
    }

}

export class BadRequestError extends CustomError {
    statusCodes = StatusCodes.BAD_REQUEST;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class NotFoundError extends CustomError {
    statusCodes = StatusCodes.NOT_FOUND;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class NotAuthorizedError extends CustomError {
    statusCodes = StatusCodes.UNAUTHORIZED;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class FileTooLargError extends CustomError {
    statusCodes = StatusCodes.REQUEST_TOO_LONG;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

export class ServerError extends CustomError {
    statusCodes = StatusCodes.SERVICE_UNAVAILABLE;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}


export interface ErrnoException extends Error {
    errorno?: number;
    code?: string;
    syscall?: string;
    path?: string;
    stack?: string;
}