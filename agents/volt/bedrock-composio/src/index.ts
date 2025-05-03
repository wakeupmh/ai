import VoltAgent, { Agent, createReasoningTools, MCPConfiguration, Tool, Toolkit } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';


const bedrock = createAmazonBedrock({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

async function main() {
  try {
    const calendarMcpConfig = new MCPConfiguration({
      servers: {
        composio: {
          type: "http",
          url: process.env.COMPOSIO_CALENDAR_MCP_URL!,
        }
      },
    });
    const emailMcpConfig = new MCPConfiguration({
      servers: {
        composio: {
          type: "http",
          url: process.env.COMPOSIO_EMAIL_MCP_URL!,
        }
      },
    });
    const fireCrawlMcpConfig = new MCPConfiguration({
      servers: {
        composio: {
          type: "http",
          url: process.env.COMPOSIO_FIRECRAWL_MCP_URL!,
        }
      },
    });
    const calendarTools = await calendarMcpConfig.getTools();
    const emailTools = await emailMcpConfig.getTools();
    const fireCrawlTools = await fireCrawlMcpConfig.getTools();
    const whiteListTools = [
      "composio_GMAIL_FETCH_EMAILS",
      "composio_GMAIL_SEND_EMAIL",
      "composio_GOOGLECALENDAR_FIND_EVENT",
      "composio_GOOGLECALENDAR_GET_CALENDAR",
      "composio_GOOGLECALENDAR_FIND_FREE_SLOTS",
      "composio_GOOGLECALENDAR_QUICK_ADD",
      "composio_FIRECRAWL_CRAWL_JOB_STATUS",
      "composio_FIRECRAWL_CRAWL_URLS",
      "composio_FIRECRAWL_EXTRACT",
      "composio_FIRECRAWL_SCRAPE_EXTRACT_DATA_LLM",
      "composio_FIRECRAWL_SEARCH",
    ];
    const appTools = [...calendarTools, ...emailTools, ...fireCrawlTools].filter((tool: Tool) => whiteListTools.includes(tool.name));

    const reasoningToolkit: Toolkit = createReasoningTools(); 
    
    const agent = new Agent({
      name: "Reasoning Assistant",
      description: "A reasoning assistant using a lightweight provider",
      tools: [reasoningToolkit, ...appTools],
      llm: new VercelAIProvider(),
      model: bedrock('amazon.nova-lite-v1:0'),
      markdown: true,
    });
  
    new VoltAgent({
      agents: {
        agent,
      },
    });
  } catch (error) {
    console.error("Failed to initialize VoltAgent:", error);
  }
}

main();
