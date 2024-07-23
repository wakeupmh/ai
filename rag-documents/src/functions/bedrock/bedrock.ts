import { PDFReader, Settings, VectorStoreIndex } from 'llamaindex'
import { BEDROCK_MODELS, Bedrock } from '@llamaindex/community'
import { StorageInterface } from '../../interfaces/storage.interface'

export default class BedrockRag {
  constructor(
    protected readonly s3: StorageInterface
  ){}

  async execute(payload: any) {
    Settings.llm = new Bedrock({
      model: BEDROCK_MODELS.ANTHROPIC_CLAUDE_3_HAIKU,
    })

    const file = await this.s3.getObject('bkt-clinical-results', 'result-24682904.pdf')
    const chunks = []
    for await (const chunk of file!.body) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)
    const reader = new PDFReader()
    const documents = await reader.loadDataAsContent(new Uint8Array(buffer))

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index = await VectorStoreIndex.fromDocuments(documents)

    // Query the index
    const queryEngine = index.asQueryEngine()
    const response = await queryEngine.query({
      query: 'What is this file?',
    })
    // Output response
    console.log(response.toString())
  }
}
