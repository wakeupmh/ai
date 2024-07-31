export interface ConfigInterface {
    envName: string;
    serviceName: string;
    projectName: string;
    account?: string;
    region: string;
    secretArn: string;
    defaultMemorySize: number;
    observability: {
        logger: {
            enabled: boolean;
            level: string;
        };
        metrics: {
            enabled: boolean;
        };
        tracer: {
            enabled: boolean;
        };
    };
    vpc: {
        default: {
            identity: string;
        };
        shared: {
            identity: string;
            sgName: string;
        };
    };
}
export declare const makeConfig: () => ConfigInterface;
