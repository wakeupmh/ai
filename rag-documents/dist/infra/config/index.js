"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = void 0;
const get_current_environment_1 = require("../helpers/get-current-environment");
const shared = {
    serviceName: 'rag-documents',
    projectName: 'rag-documents',
    secretArn: 'rag-documents-secret',
    observability: {
        logger: {
            enabled: true,
            level: 'INFO',
        },
        metrics: {
            enabled: true,
        },
        tracer: {
            enabled: true,
        },
    },
};
const dev = {
    envName: 'dev',
    account: process.env.DEV_ACCOUNT,
    region: 'us-east-1',
    defaultMemorySize: 1024,
    vpc: {
        default: {
            identity: 'devops-vpc',
        },
        shared: {
            identity: 'shared-vpc-workload',
            sgName: 'shared-vpc-security-group',
        },
    },
};
const stage = {
    envName: 'stage',
    account: process.env.STG_ACCOUNT,
    region: 'us-east-1',
    defaultMemorySize: 1024,
    vpc: {
        default: {
            identity: 'stage-vpc',
        },
        shared: {
            identity: 'shared-vpc-workload',
            sgName: 'shared-vpc-security-group',
        },
    },
};
const prod = {
    envName: 'prod',
    account: process.env.PROD_ACCOUNT,
    region: 'us-east-1',
    defaultMemorySize: 1024,
    vpc: {
        default: {
            identity: 'workload-vpc',
        },
        shared: {
            identity: 'shared-vpc-workload',
            sgName: 'shared-vpc-security-group',
        },
    },
};
const makeConfig = () => {
    switch ((0, get_current_environment_1.getCurrentEnvironment)()) {
        case 'prod':
            return { ...shared, ...prod, envName: 'prod' };
        case 'stage':
            return { ...shared, ...stage, envName: 'stage' };
        default:
            return { ...shared, ...dev, envName: 'dev' };
    }
};
exports.makeConfig = makeConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9pbmZyYS9jb25maWcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0ZBQTBFO0FBRTFFLE1BQU0sTUFBTSxHQUFHO0lBQ2IsV0FBVyxFQUFFLGVBQWU7SUFDNUIsV0FBVyxFQUFFLGVBQWU7SUFDNUIsU0FBUyxFQUFFLHNCQUFzQjtJQUVqQyxhQUFhLEVBQUU7UUFDYixNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxNQUFNO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLElBQUk7U0FDZDtLQUNGO0NBQ0YsQ0FBQTtBQUVELE1BQU0sR0FBRyxHQUFHO0lBQ1YsT0FBTyxFQUFFLEtBQUs7SUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO0lBQ2hDLE1BQU0sRUFBRSxXQUFXO0lBQ25CLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLFlBQVk7U0FDdkI7UUFDRCxNQUFNLEVBQUU7WUFDTixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLE1BQU0sRUFBRSwyQkFBMkI7U0FDcEM7S0FDRjtDQUNGLENBQUE7QUFFRCxNQUFNLEtBQUssR0FBRztJQUNaLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7SUFDaEMsTUFBTSxFQUFFLFdBQVc7SUFDbkIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsV0FBVztTQUN0QjtRQUNELE1BQU0sRUFBRTtZQUNOLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsTUFBTSxFQUFFLDJCQUEyQjtTQUNwQztLQUNGO0NBQ0YsQ0FBQTtBQUVELE1BQU0sSUFBSSxHQUFHO0lBQ1gsT0FBTyxFQUFFLE1BQU07SUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO0lBQ2pDLE1BQU0sRUFBRSxXQUFXO0lBQ25CLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLGNBQWM7U0FDekI7UUFDRCxNQUFNLEVBQUU7WUFDTixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLE1BQU0sRUFBRSwyQkFBMkI7U0FDcEM7S0FDRjtDQUNGLENBQUE7QUFpQ00sTUFBTSxVQUFVLEdBQUcsR0FBb0IsRUFBRTtJQUM5QyxRQUFRLElBQUEsK0NBQXFCLEdBQUUsRUFBRTtRQUMvQixLQUFLLE1BQU07WUFDVCxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQ2hELEtBQUssT0FBTztZQUNWLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQ7WUFDRSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFBO0tBQy9DO0FBQ0gsQ0FBQyxDQUFBO0FBVFksUUFBQSxVQUFVLGNBU3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q3VycmVudEVudmlyb25tZW50IH0gZnJvbSAnLi4vaGVscGVycy9nZXQtY3VycmVudC1lbnZpcm9ubWVudCdcblxuY29uc3Qgc2hhcmVkID0ge1xuICBzZXJ2aWNlTmFtZTogJ3JhZy1kb2N1bWVudHMnLFxuICBwcm9qZWN0TmFtZTogJ3JhZy1kb2N1bWVudHMnLFxuICBzZWNyZXRBcm46ICdyYWctZG9jdW1lbnRzLXNlY3JldCcsXG5cbiAgb2JzZXJ2YWJpbGl0eToge1xuICAgIGxvZ2dlcjoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGxldmVsOiAnSU5GTycsXG4gICAgfSxcbiAgICBtZXRyaWNzOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgIH0sXG4gICAgdHJhY2VyOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRldiA9IHtcbiAgZW52TmFtZTogJ2RldicsXG4gIGFjY291bnQ6IHByb2Nlc3MuZW52LkRFVl9BQ0NPVU5ULFxuICByZWdpb246ICd1cy1lYXN0LTEnLFxuICBkZWZhdWx0TWVtb3J5U2l6ZTogMTAyNCxcbiAgdnBjOiB7XG4gICAgZGVmYXVsdDoge1xuICAgICAgaWRlbnRpdHk6ICdkZXZvcHMtdnBjJyxcbiAgICB9LFxuICAgIHNoYXJlZDoge1xuICAgICAgaWRlbnRpdHk6ICdzaGFyZWQtdnBjLXdvcmtsb2FkJyxcbiAgICAgIHNnTmFtZTogJ3NoYXJlZC12cGMtc2VjdXJpdHktZ3JvdXAnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IHN0YWdlID0ge1xuICBlbnZOYW1lOiAnc3RhZ2UnLFxuICBhY2NvdW50OiBwcm9jZXNzLmVudi5TVEdfQUNDT1VOVCxcbiAgcmVnaW9uOiAndXMtZWFzdC0xJyxcbiAgZGVmYXVsdE1lbW9yeVNpemU6IDEwMjQsXG4gIHZwYzoge1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGlkZW50aXR5OiAnc3RhZ2UtdnBjJyxcbiAgICB9LFxuICAgIHNoYXJlZDoge1xuICAgICAgaWRlbnRpdHk6ICdzaGFyZWQtdnBjLXdvcmtsb2FkJyxcbiAgICAgIHNnTmFtZTogJ3NoYXJlZC12cGMtc2VjdXJpdHktZ3JvdXAnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IHByb2QgPSB7XG4gIGVudk5hbWU6ICdwcm9kJyxcbiAgYWNjb3VudDogcHJvY2Vzcy5lbnYuUFJPRF9BQ0NPVU5ULFxuICByZWdpb246ICd1cy1lYXN0LTEnLFxuICBkZWZhdWx0TWVtb3J5U2l6ZTogMTAyNCxcbiAgdnBjOiB7XG4gICAgZGVmYXVsdDoge1xuICAgICAgaWRlbnRpdHk6ICd3b3JrbG9hZC12cGMnLFxuICAgIH0sXG4gICAgc2hhcmVkOiB7XG4gICAgICBpZGVudGl0eTogJ3NoYXJlZC12cGMtd29ya2xvYWQnLFxuICAgICAgc2dOYW1lOiAnc2hhcmVkLXZwYy1zZWN1cml0eS1ncm91cCcsXG4gICAgfSxcbiAgfSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb25maWdJbnRlcmZhY2Uge1xuICBlbnZOYW1lOiBzdHJpbmdcbiAgc2VydmljZU5hbWU6IHN0cmluZ1xuICBwcm9qZWN0TmFtZTogc3RyaW5nXG4gIGFjY291bnQ/OiBzdHJpbmdcbiAgcmVnaW9uOiBzdHJpbmdcbiAgc2VjcmV0QXJuOiBzdHJpbmdcbiAgZGVmYXVsdE1lbW9yeVNpemU6IG51bWJlclxuICBvYnNlcnZhYmlsaXR5OiB7XG4gICAgbG9nZ2VyOiB7XG4gICAgICBlbmFibGVkOiBib29sZWFuXG4gICAgICBsZXZlbDogc3RyaW5nXG4gICAgfVxuICAgIG1ldHJpY3M6IHtcbiAgICAgIGVuYWJsZWQ6IGJvb2xlYW5cbiAgICB9XG4gICAgdHJhY2VyOiB7XG4gICAgICBlbmFibGVkOiBib29sZWFuXG4gICAgfVxuICB9XG4gIHZwYzoge1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGlkZW50aXR5OiBzdHJpbmdcbiAgICB9XG4gICAgc2hhcmVkOiB7XG4gICAgICBpZGVudGl0eTogc3RyaW5nXG4gICAgICBzZ05hbWU6IHN0cmluZ1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUNvbmZpZyA9ICgpOiBDb25maWdJbnRlcmZhY2UgPT4ge1xuICBzd2l0Y2ggKGdldEN1cnJlbnRFbnZpcm9ubWVudCgpKSB7XG4gICAgY2FzZSAncHJvZCc6XG4gICAgICByZXR1cm4geyAuLi5zaGFyZWQsIC4uLnByb2QsIGVudk5hbWU6ICdwcm9kJyB9XG4gICAgY2FzZSAnc3RhZ2UnOlxuICAgICAgcmV0dXJuIHsgLi4uc2hhcmVkLCAuLi5zdGFnZSwgZW52TmFtZTogJ3N0YWdlJyB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7IC4uLnNoYXJlZCwgLi4uZGV2LCBlbnZOYW1lOiAnZGV2JyB9XG4gIH1cbn1cbiJdfQ==