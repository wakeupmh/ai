import { PDFReader, VectorStoreIndex } from 'llamaindex'
import { StorageInterface } from '../../interfaces/storage.interface'

export class GPTRag {
  constructor(protected readonly s3: StorageInterface) {}

  async execute(query: string) {
    console.log('GPTRag executed with payload: ', query)

    try {
      const file = await this.s3.getObject(process.env.BKT_NAME!, 'result.pdf')
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
        query,
      })
      // Output response
      console.log(response.toString())
    } catch (err) {
      console.error(err)
    }
  }
}
