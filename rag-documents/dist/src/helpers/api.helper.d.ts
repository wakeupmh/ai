import type { APIGatewayProxyResult } from 'aws-lambda';
export declare enum HttpStatus {
    Ok = 200,
    OkCreated = 201,
    OkNoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503
}
export declare const makeResponse: <T>(body: T, status?: HttpStatus) => APIGatewayProxyResult;
