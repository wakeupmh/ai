"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["OkCreated"] = 201] = "OkCreated";
    HttpStatus[HttpStatus["OkNoContent"] = 204] = "OkNoContent";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["Forbidden"] = 403] = "Forbidden";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["Conflict"] = 409] = "Conflict";
    HttpStatus[HttpStatus["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
    HttpStatus[HttpStatus["NotImplemented"] = 501] = "NotImplemented";
    HttpStatus[HttpStatus["BadGateway"] = 502] = "BadGateway";
    HttpStatus[HttpStatus["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
const makeResponse = (body, status) => {
    return {
        body: JSON.stringify(body),
        statusCode: status || HttpStatus.Ok,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        isBase64Encoded: false,
    };
};
exports.makeResponse = makeResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2FwaS5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsSUFBWSxVQWNYO0FBZEQsV0FBWSxVQUFVO0lBQ3BCLHlDQUFRLENBQUE7SUFDUix1REFBZSxDQUFBO0lBQ2YsMkRBQWlCLENBQUE7SUFDakIseURBQWdCLENBQUE7SUFDaEIsNkRBQWtCLENBQUE7SUFDbEIsdURBQWUsQ0FBQTtJQUNmLHFEQUFjLENBQUE7SUFDZCxxREFBYyxDQUFBO0lBQ2QsMkVBQXlCLENBQUE7SUFDekIsMkVBQXlCLENBQUE7SUFDekIsaUVBQW9CLENBQUE7SUFDcEIseURBQWdCLENBQUE7SUFDaEIseUVBQXdCLENBQUE7QUFDMUIsQ0FBQyxFQWRXLFVBQVUsMEJBQVYsVUFBVSxRQWNyQjtBQUVNLE1BQU0sWUFBWSxHQUFHLENBQUksSUFBTyxFQUFFLE1BQW1CLEVBQXlCLEVBQUU7SUFDckYsT0FBTztRQUNMLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMxQixVQUFVLEVBQUUsTUFBTSxJQUFJLFVBQVUsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sRUFBRTtZQUNQLDZCQUE2QixFQUFFLEdBQUc7U0FDbkM7UUFDRCxlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBVFksUUFBQSxZQUFZLGdCQVN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSdcblxuZXhwb3J0IGVudW0gSHR0cFN0YXR1cyB7XG4gIE9rID0gMjAwLFxuICBPa0NyZWF0ZWQgPSAyMDEsXG4gIE9rTm9Db250ZW50ID0gMjA0LFxuICBCYWRSZXF1ZXN0ID0gNDAwLFxuICBVbmF1dGhvcml6ZWQgPSA0MDEsXG4gIEZvcmJpZGRlbiA9IDQwMyxcbiAgTm90Rm91bmQgPSA0MDQsXG4gIENvbmZsaWN0ID0gNDA5LFxuICBVbnByb2Nlc3NhYmxlRW50aXR5ID0gNDIyLFxuICBJbnRlcm5hbFNlcnZlckVycm9yID0gNTAwLFxuICBOb3RJbXBsZW1lbnRlZCA9IDUwMSxcbiAgQmFkR2F0ZXdheSA9IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlID0gNTAzLFxufVxuXG5leHBvcnQgY29uc3QgbWFrZVJlc3BvbnNlID0gPFQ+KGJvZHk6IFQsIHN0YXR1cz86IEh0dHBTdGF0dXMpOiBBUElHYXRld2F5UHJveHlSZXN1bHQgPT4ge1xuICByZXR1cm4ge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgIHN0YXR1c0NvZGU6IHN0YXR1cyB8fCBIdHRwU3RhdHVzLk9rLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgfSxcbiAgICBpc0Jhc2U2NEVuY29kZWQ6IGZhbHNlLFxuICB9XG59XG4iXX0=