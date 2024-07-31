"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPTRag = void 0;
const llamaindex_1 = require("llamaindex");
class GPTRag {
    constructor(s3) {
        this.s3 = s3;
    }
    async execute(query) {
        console.log('GPTRag executed with payload: ', query);
        try {
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
            console.log(response.toString());
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.GPTRag = GPTRag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3B0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9ncHQvZ3B0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF3RDtBQUd4RCxNQUFhLE1BQU07SUFDakIsWUFBK0IsRUFBb0I7UUFBcEIsT0FBRSxHQUFGLEVBQUUsQ0FBa0I7SUFBRyxDQUFDO0lBRXZELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBYTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXBELElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUyxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQ3pFLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxJQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ25CO1lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQTtZQUM5QixNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBRXhFLHFFQUFxRTtZQUNyRSxNQUFNLEtBQUssR0FBRyxNQUFNLDZCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUU3RCxrQkFBa0I7WUFDbEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQ3pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDdkMsS0FBSzthQUNOLENBQUMsQ0FBQTtZQUNGLGtCQUFrQjtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1NBQ2pDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ25CO0lBQ0gsQ0FBQztDQUNGO0FBOUJELHdCQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBERlJlYWRlciwgVmVjdG9yU3RvcmVJbmRleCB9IGZyb20gJ2xsYW1haW5kZXgnXG5pbXBvcnQgeyBTdG9yYWdlSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9zdG9yYWdlLmludGVyZmFjZSdcblxuZXhwb3J0IGNsYXNzIEdQVFJhZyB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBzMzogU3RvcmFnZUludGVyZmFjZSkge31cblxuICBhc3luYyBleGVjdXRlKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZygnR1BUUmFnIGV4ZWN1dGVkIHdpdGggcGF5bG9hZDogJywgcXVlcnkpXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMuczMuZ2V0T2JqZWN0KHByb2Nlc3MuZW52LkJLVF9OQU1FISwgJ3Jlc3VsdC5wZGYnKVxuICAgICAgY29uc3QgY2h1bmtzID0gW11cbiAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgZmlsZSEuYm9keSkge1xuICAgICAgICBjaHVua3MucHVzaChjaHVuaylcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoY2h1bmtzKVxuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IFBERlJlYWRlcigpXG4gICAgICBjb25zdCBkb2N1bWVudHMgPSBhd2FpdCByZWFkZXIubG9hZERhdGFBc0NvbnRlbnQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcblxuICAgICAgLy8gU3BsaXQgdGV4dCBhbmQgY3JlYXRlIGVtYmVkZGluZ3MuIFN0b3JlIHRoZW0gaW4gYSBWZWN0b3JTdG9yZUluZGV4XG4gICAgICBjb25zdCBpbmRleCA9IGF3YWl0IFZlY3RvclN0b3JlSW5kZXguZnJvbURvY3VtZW50cyhkb2N1bWVudHMpXG5cbiAgICAgIC8vIFF1ZXJ5IHRoZSBpbmRleFxuICAgICAgY29uc3QgcXVlcnlFbmdpbmUgPSBpbmRleC5hc1F1ZXJ5RW5naW5lKClcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcXVlcnlFbmdpbmUucXVlcnkoe1xuICAgICAgICBxdWVyeSxcbiAgICAgIH0pXG4gICAgICAvLyBPdXRwdXQgcmVzcG9uc2VcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnRvU3RyaW5nKCkpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gIH1cbn1cbiJdfQ==