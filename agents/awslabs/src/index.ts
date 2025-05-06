import { AgentSquad, BedrockLLMAgent, BedrockClassifier, DynamoDbChatStorage } from "agent-squad";

const tableName = 'agent-memo';
const region = 'us-east-1';
const TTL_DURATION = 3600;
const dynamoDbStorage = new DynamoDbChatStorage(tableName, region, 'ttl', TTL_DURATION);
const orchestrator = new AgentSquad({
  storage: dynamoDbStorage,
  classifier: new BedrockClassifier({
    modelId: "amazon.nova-pro-v1:0",
  }),
  config: {
    LOG_AGENT_CHAT: true,
    LOG_CLASSIFIER_CHAT: true,
    LOG_CLASSIFIER_RAW_OUTPUT: false,
    LOG_CLASSIFIER_OUTPUT: true,
    LOG_EXECUTION_TIMES: true,
  }
});

orchestrator.addAgent(
  new BedrockLLMAgent({
    name: "DynamoDB Agent",
    modelId: "amazon.nova-lite-v1:0",
    description: "Specializes in DynamoDB operations and management.",
  })
);

orchestrator.addAgent(
  new BedrockLLMAgent({
    name: "Cooking Agent",
    modelId: "amazon.nova-lite-v1:0",
    description: "Focuses on cooking and nutrition topics such as general wellness, nutrition, diseases, treatments, mental health, fitness, healthcare systems, and medical terminology or concepts.",
  })
);

const userId = "quickstart-user";
const sessionId = "quickstart-session";
const query = "what is the best way to cook a steak?";
console.log(`\nUser Query: ${query}`);

async function main() {
  try {
    const response = await orchestrator.routeRequest(query, userId, sessionId);
    console.log("\n** RESPONSE ** \n");
    console.log(`> Agent ID: ${response.metadata.agentId}`);
    console.log(`> Agent Name: ${response.metadata.agentName}`);
    console.log(`> User Input: ${response.metadata.userInput}`);
    console.log(`> User ID: ${response.metadata.userId}`);
    console.log(`> Session ID: ${response.metadata.sessionId}`);
    console.log(
      `> Additional Parameters:`,
      response.metadata.additionalParams
    );
    console.log(`\n> Response: `);
    console.log(response.output);
    await dynamoDbStorage.saveChatMessage(userId, sessionId, response.metadata.agentId, response as any);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();