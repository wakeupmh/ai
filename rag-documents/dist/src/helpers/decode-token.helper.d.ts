export type TokenDecoded = {
    email: string;
    name: string;
    role: string;
    accountId: string;
    locale: string;
    plan: string;
    subscriptionId: string;
    customerId: string;
    userId: string;
};
export declare const decodeToken: (token: string) => TokenDecoded | undefined;
