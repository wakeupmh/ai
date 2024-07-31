import { StorageInterface } from '../../interfaces/storage.interface';
export default class BedrockRag {
    protected readonly s3: StorageInterface;
    constructor(s3: StorageInterface);
    execute(query: string): Promise<void>;
}
