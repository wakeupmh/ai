import { z, ZodType } from 'zod';
export declare function validateRequest<T extends ZodType>(schema: T, objectToValidate: any): Promise<z.infer<T>>;
