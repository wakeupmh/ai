import type { APIGatewayProxyResult } from 'aws-lambda'

export enum HttpStatus {
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
  ServiceUnavailable = 503,
}

export const makeResponse = <T>(body: T, status?: HttpStatus): APIGatewayProxyResult => {
  return {
    body: JSON.stringify(body),
    statusCode: status || HttpStatus.Ok,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    isBase64Encoded: false,
  }
}
