"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const s3_resolver_1 = require("../../resolvers/s3.resolver");
const bedrock_1 = __importDefault(require("./bedrock"));
const useCaseResolver = () => {
    const s3 = (0, s3_resolver_1.s3Resolver)();
    return new bedrock_1.default(s3);
};
const handler = async (event, _, callback) => {
    const useCase = useCaseResolver();
    try {
        console.log('event', event);
        const { body } = event;
        const { query } = JSON.parse(body || '{}');
        await useCase.execute(query);
        return callback(null);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVkcm9jay5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9iZWRyb2NrL2JlZHJvY2suaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2REFBd0Q7QUFDeEQsd0RBQWtDO0FBRWxDLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLEVBQUUsR0FBRyxJQUFBLHdCQUFVLEdBQUUsQ0FBQTtJQUN2QixPQUFPLElBQUksaUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLENBQU0sRUFBRSxRQUFhLEVBQUUsRUFBRTtJQUNqRSxNQUFNLE9BQU8sR0FBRyxlQUFlLEVBQUUsQ0FBQTtJQUVqQyxJQUFJO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDM0IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUN0QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUE7UUFFMUMsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRTVCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwQixNQUFNLEtBQUssQ0FBQTtLQUNaO0FBQ0gsQ0FBQyxDQUFBO0FBZlksUUFBQSxPQUFPLFdBZW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgczNSZXNvbHZlciB9IGZyb20gJy4uLy4uL3Jlc29sdmVycy9zMy5yZXNvbHZlcidcbmltcG9ydCBCZWRyb2NrUmFnIGZyb20gJy4vYmVkcm9jaydcblxuY29uc3QgdXNlQ2FzZVJlc29sdmVyID0gKCkgPT4ge1xuICBjb25zdCBzMyA9IHMzUmVzb2x2ZXIoKVxuICByZXR1cm4gbmV3IEJlZHJvY2tSYWcoczMpXG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIF86IGFueSwgY2FsbGJhY2s6IGFueSkgPT4ge1xuICBjb25zdCB1c2VDYXNlID0gdXNlQ2FzZVJlc29sdmVyKClcblxuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKCdldmVudCcsIGV2ZW50KVxuICAgIGNvbnN0IHsgYm9keSB9ID0gZXZlbnRcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBKU09OLnBhcnNlKGJvZHkgfHwgJ3t9JylcblxuICAgIGF3YWl0IHVzZUNhc2UuZXhlY3V0ZShxdWVyeSlcblxuICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgdGhyb3cgZXJyb3JcbiAgfVxufVxuIl19