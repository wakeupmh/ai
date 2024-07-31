"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llamaindex_1 = require("llamaindex");
const community_1 = require("@llamaindex/community");
class BedrockRag {
    constructor(s3) {
        this.s3 = s3;
    }
    async execute(query) {
        try {
            llamaindex_1.Settings.llm = new community_1.Bedrock({
                model: community_1.BEDROCK_MODELS.ANTHROPIC_CLAUDE_3_HAIKU,
            });
            const file = await this.s3.getObject(process.env.BKT_NAME, 'result.pdf');
            const chunks = [];
            for await (const chunk of file.body) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const reader = new llamaindex_1.PDFReader();
            const documents = await reader.loadDataAsContent(new Uint8Array(buffer));
            // Split text and create embeddings. Store them in a VectorStoreIndex
            const index = await llamaindex_1.VectorStoreIndex.fromDocuments(documents);
            // Query the index
            const queryEngine = index.asQueryEngine();
            const response = await queryEngine.query({
                query,
            });
            // Output response
            console.log(response.message.content);
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = BedrockRag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVkcm9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvYmVkcm9jay9iZWRyb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQWtFO0FBQ2xFLHFEQUErRDtBQUcvRCxNQUFxQixVQUFVO0lBQzdCLFlBQStCLEVBQW9CO1FBQXBCLE9BQUUsR0FBRixFQUFFLENBQWtCO0lBQUcsQ0FBQztJQUV2RCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWE7UUFDekIsSUFBSTtZQUNGLHFCQUFRLENBQUMsR0FBRyxHQUFHLElBQUksbUJBQU8sQ0FBQztnQkFDekIsS0FBSyxFQUFFLDBCQUFjLENBQUMsd0JBQXdCO2FBQy9DLENBQUMsQ0FBQTtZQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFTLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDekUsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLElBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDbkI7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFBO1lBQzlCLE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFFeEUscUVBQXFFO1lBQ3JFLE1BQU0sS0FBSyxHQUFHLE1BQU0sNkJBQWdCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBRTdELGtCQUFrQjtZQUNsQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDekMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLO2FBQ04sQ0FBQyxDQUFBO1lBQ0Ysa0JBQWtCO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN0QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNyQjtJQUNILENBQUM7Q0FDRjtBQWhDRCw2QkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQREZSZWFkZXIsIFNldHRpbmdzLCBWZWN0b3JTdG9yZUluZGV4IH0gZnJvbSAnbGxhbWFpbmRleCdcbmltcG9ydCB7IEJFRFJPQ0tfTU9ERUxTLCBCZWRyb2NrIH0gZnJvbSAnQGxsYW1haW5kZXgvY29tbXVuaXR5J1xuaW1wb3J0IHsgU3RvcmFnZUludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc3RvcmFnZS5pbnRlcmZhY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlZHJvY2tSYWcge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgczM6IFN0b3JhZ2VJbnRlcmZhY2UpIHt9XG5cbiAgYXN5bmMgZXhlY3V0ZShxdWVyeTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIFNldHRpbmdzLmxsbSA9IG5ldyBCZWRyb2NrKHtcbiAgICAgICAgbW9kZWw6IEJFRFJPQ0tfTU9ERUxTLkFOVEhST1BJQ19DTEFVREVfM19IQUlLVSxcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGZpbGUgPSBhd2FpdCB0aGlzLnMzLmdldE9iamVjdChwcm9jZXNzLmVudi5CS1RfTkFNRSEsICdyZXN1bHQucGRmJylcbiAgICAgIGNvbnN0IGNodW5rcyA9IFtdXG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIGZpbGUhLmJvZHkpIHtcbiAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspXG4gICAgICB9XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuY29uY2F0KGNodW5rcylcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBQREZSZWFkZXIoKVxuICAgICAgY29uc3QgZG9jdW1lbnRzID0gYXdhaXQgcmVhZGVyLmxvYWREYXRhQXNDb250ZW50KG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpXG5cbiAgICAgIC8vIFNwbGl0IHRleHQgYW5kIGNyZWF0ZSBlbWJlZGRpbmdzLiBTdG9yZSB0aGVtIGluIGEgVmVjdG9yU3RvcmVJbmRleFxuICAgICAgY29uc3QgaW5kZXggPSBhd2FpdCBWZWN0b3JTdG9yZUluZGV4LmZyb21Eb2N1bWVudHMoZG9jdW1lbnRzKVxuXG4gICAgICAvLyBRdWVyeSB0aGUgaW5kZXhcbiAgICAgIGNvbnN0IHF1ZXJ5RW5naW5lID0gaW5kZXguYXNRdWVyeUVuZ2luZSgpXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHF1ZXJ5RW5naW5lLnF1ZXJ5KHtcbiAgICAgICAgcXVlcnksXG4gICAgICB9KVxuICAgICAgLy8gT3V0cHV0IHJlc3BvbnNlXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5tZXNzYWdlLmNvbnRlbnQpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfVxuICB9XG59XG4iXX0=