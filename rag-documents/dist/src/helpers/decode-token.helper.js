"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const decodeToken = (token) => {
    try {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const response = {
            email: decoded.email,
            name: decoded.name,
            locale: decoded.locale,
            role: decoded['custom:role'] || '',
            accountId: decoded['custom:accountId'] || '',
            plan: decoded['custom:plan'] || '',
            subscriptionId: decoded['custom:subscriptionId'] || '',
            customerId: decoded['custom:customerId'] || '',
            userId: decoded['custom:userId'] || '',
        };
        if (!response.email)
            throw new Error('email is required');
        if (!response.accountId)
            throw new Error('accountId is required');
        if (!response.userId)
            throw new Error('userId is required');
        if (!response.plan)
            throw new Error('plan is required');
        return response;
    }
    catch (e) {
        console.error('error', e);
        return undefined;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlLXRva2VuLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2RlY29kZS10b2tlbi5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBWU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFhLEVBQTRCLEVBQUU7SUFDckUsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDakYsTUFBTSxRQUFRLEdBQUc7WUFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDbEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUU7WUFDNUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ2xDLGNBQWMsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFO1lBQ3RELFVBQVUsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFO1lBQzlDLE1BQU0sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtTQUN2QyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBRXZELE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6QixPQUFPLFNBQVMsQ0FBQTtLQUNqQjtBQUNILENBQUMsQ0FBQTtBQXhCWSxRQUFBLFdBQVcsZUF3QnZCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgVG9rZW5EZWNvZGVkID0ge1xuICBlbWFpbDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICByb2xlOiBzdHJpbmdcbiAgYWNjb3VudElkOiBzdHJpbmdcbiAgbG9jYWxlOiBzdHJpbmdcbiAgcGxhbjogc3RyaW5nXG4gIHN1YnNjcmlwdGlvbklkOiBzdHJpbmdcbiAgY3VzdG9tZXJJZDogc3RyaW5nXG4gIHVzZXJJZDogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBkZWNvZGVUb2tlbiA9ICh0b2tlbjogc3RyaW5nKTogVG9rZW5EZWNvZGVkIHwgdW5kZWZpbmVkID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gSlNPTi5wYXJzZShCdWZmZXIuZnJvbSh0b2tlbi5zcGxpdCgnLicpWzFdLCAnYmFzZTY0JykudG9TdHJpbmcoKSlcbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIGVtYWlsOiBkZWNvZGVkLmVtYWlsLFxuICAgICAgbmFtZTogZGVjb2RlZC5uYW1lLFxuICAgICAgbG9jYWxlOiBkZWNvZGVkLmxvY2FsZSxcbiAgICAgIHJvbGU6IGRlY29kZWRbJ2N1c3RvbTpyb2xlJ10gfHwgJycsXG4gICAgICBhY2NvdW50SWQ6IGRlY29kZWRbJ2N1c3RvbTphY2NvdW50SWQnXSB8fCAnJyxcbiAgICAgIHBsYW46IGRlY29kZWRbJ2N1c3RvbTpwbGFuJ10gfHwgJycsXG4gICAgICBzdWJzY3JpcHRpb25JZDogZGVjb2RlZFsnY3VzdG9tOnN1YnNjcmlwdGlvbklkJ10gfHwgJycsXG4gICAgICBjdXN0b21lcklkOiBkZWNvZGVkWydjdXN0b206Y3VzdG9tZXJJZCddIHx8ICcnLFxuICAgICAgdXNlcklkOiBkZWNvZGVkWydjdXN0b206dXNlcklkJ10gfHwgJycsXG4gICAgfVxuICAgIGlmICghcmVzcG9uc2UuZW1haWwpIHRocm93IG5ldyBFcnJvcignZW1haWwgaXMgcmVxdWlyZWQnKVxuICAgIGlmICghcmVzcG9uc2UuYWNjb3VudElkKSB0aHJvdyBuZXcgRXJyb3IoJ2FjY291bnRJZCBpcyByZXF1aXJlZCcpXG4gICAgaWYgKCFyZXNwb25zZS51c2VySWQpIHRocm93IG5ldyBFcnJvcigndXNlcklkIGlzIHJlcXVpcmVkJylcbiAgICBpZiAoIXJlc3BvbnNlLnBsYW4pIHRocm93IG5ldyBFcnJvcigncGxhbiBpcyByZXF1aXJlZCcpXG5cbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZSlcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cbiJdfQ==