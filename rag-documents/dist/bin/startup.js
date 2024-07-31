#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = __importStar(require("aws-cdk-lib"));
const config_1 = require("../infra/config");
const stacks_1 = require("../infra/stacks");
const app = new cdk.App();
const config = (0, config_1.makeConfig)();
const resourcesStack = new stacks_1.ResourcesStack(app, 'root-resources-stack', {
    env: {
        account: config.account,
        region: config.region,
    },
});
const stackParams = {
    resourcesStack,
    env: {
        account: config.account,
        region: config.region,
    },
};
new stacks_1.RagLambdaStack(app, 'root-rag-lambda-stack', stackParams);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2Jpbi9zdGFydHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQW9DO0FBQ3BDLGlEQUFrQztBQUVsQyw0Q0FBNEM7QUFFNUMsNENBQWdFO0FBRWhFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBRXpCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVUsR0FBRSxDQUFBO0FBRzNCLE1BQU0sY0FBYyxHQUFHLElBQUksdUJBQWMsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLEVBQUU7SUFDckUsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtLQUN0QjtDQUNGLENBQUMsQ0FBQTtBQUVGLE1BQU0sV0FBVyxHQUF1QjtJQUN0QyxjQUFjO0lBQ2QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtLQUN0QjtDQUNGLENBQUE7QUFFRCxJQUFJLHVCQUFjLENBQUMsR0FBRyxFQUFFLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInXG5cbmltcG9ydCB7IG1ha2VDb25maWcgfSBmcm9tICcuLi9pbmZyYS9jb25maWcnXG5pbXBvcnQgeyBGdW5jdGlvblN0YWNrUHJvcHMgfSBmcm9tICcuLi9pbmZyYS9pbnRlcmZhY2VzL2Z1bmN0aW9ucy1zdGFjay1wcm9wcy5pbnRlcmZhY2UnXG5pbXBvcnQgeyBSYWdMYW1iZGFTdGFjaywgUmVzb3VyY2VzU3RhY2sgfSBmcm9tICcuLi9pbmZyYS9zdGFja3MnXG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKClcblxuY29uc3QgY29uZmlnID0gbWFrZUNvbmZpZygpXG5cblxuY29uc3QgcmVzb3VyY2VzU3RhY2sgPSBuZXcgUmVzb3VyY2VzU3RhY2soYXBwLCAncm9vdC1yZXNvdXJjZXMtc3RhY2snLCB7XG4gIGVudjoge1xuICAgIGFjY291bnQ6IGNvbmZpZy5hY2NvdW50LFxuICAgIHJlZ2lvbjogY29uZmlnLnJlZ2lvbixcbiAgfSxcbn0pXG5cbmNvbnN0IHN0YWNrUGFyYW1zOiBGdW5jdGlvblN0YWNrUHJvcHMgPSB7XG4gIHJlc291cmNlc1N0YWNrLFxuICBlbnY6IHtcbiAgICBhY2NvdW50OiBjb25maWcuYWNjb3VudCxcbiAgICByZWdpb246IGNvbmZpZy5yZWdpb24sXG4gIH0sXG59XG5cbm5ldyBSYWdMYW1iZGFTdGFjayhhcHAsICdyb290LXJhZy1sYW1iZGEtc3RhY2snLCBzdGFja1BhcmFtcylcbiJdfQ==