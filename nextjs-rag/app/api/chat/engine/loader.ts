import { PDFReader } from "llamaindex";
import { FILE_EXT_TO_READER } from "llamaindex/readers/SimpleDirectoryReader";
import S3Storage from "../../infra/storage/s3-storage";

export const DATA_DIR = "./data";

export function getExtractors() {
  return FILE_EXT_TO_READER;
}

export async function getDocuments() {
  const s3 = new S3Storage();

  const file = await s3.getObject(process.env.BKT_NAME!, "result.pdf");
  const chunks = [];
  for await (const chunk of file!.body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const reader = new PDFReader();
  return await reader.loadDataAsContent(new Uint8Array(buffer));
}
