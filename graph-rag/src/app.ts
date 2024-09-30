import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Loaders
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { config } from "dotenv";
import { Document } from "langchain/document";

config();

// Read data useing directory loader
const loader = new DirectoryLoader("./docs", {
	".json": (path) => new JSONLoader(path),
	".txt": (path) => new TextLoader(path),
	".csv": (path) => new CSVLoader(path, { separator: "," }),
	".pdf": (path) => new PDFLoader(path),
});

// See contents of docs that are being being loaded
const docs = await loader.load();
console.log(docs);
const csvContent = docs.map((doc: Document) => doc.pageContent);
console.log(`Page Content ---> ${csvContent}`);

const askModel = async (question: string) => {
	const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
	let vectorStore;

	const textSplitter = new RecursiveCharacterTextSplitter({
		// To learn more about the parameters visit: https://dev.to/peterabel/what-chunk-size-and-chunk-overlap-should-you-use-4338
		chunkSize: 1000,
		chunkOverlap: 900,
	});
	console.log("Text Splitting......");
	console.log(`Chunk size  ----> ${textSplitter.chunkSize}`);
	console.log(`Chunk Overlap  ----> ${textSplitter.chunkOverlap}`);

	const splitDocs = await textSplitter.createDocuments(csvContent);

	vectorStore = await HNSWLib.fromDocuments(
		splitDocs,
		new OpenAIEmbeddings()
	);

	await vectorStore.save("MyVectore.index");
	console.log(`Vector store created`);
	// }

	// RetrievalQAChain
	const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
	console.log("Querying...");
	const res = await chain.call({ query: question });
	console.log(res);
};

askModel("How many reviews do we have ?");
