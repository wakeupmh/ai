import { StorageInterface } from '../../interfaces/storage.interface';
export declare class GPTRag {
    protected readonly s3: StorageInterface;
    constructor(s3: StorageInterface);
    execute(query: string): Promise<void>;
}
