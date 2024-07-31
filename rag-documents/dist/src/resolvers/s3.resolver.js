"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Resolver = void 0;
const s3_storage_1 = __importDefault(require("../infra/storage/s3-storage"));
const s3Resolver = () => {
    return new s3_storage_1.default();
};
exports.s3Resolver = s3Resolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVzb2x2ZXJzL3MzLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZFQUFtRDtBQUU1QyxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUU7SUFDN0IsT0FBTyxJQUFJLG9CQUFTLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFGWSxRQUFBLFVBQVUsY0FFdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUzNTdG9yYWdlIGZyb20gJy4uL2luZnJhL3N0b3JhZ2UvczMtc3RvcmFnZSdcblxuZXhwb3J0IGNvbnN0IHMzUmVzb2x2ZXIgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUzNTdG9yYWdlKClcbn1cbiJdfQ==