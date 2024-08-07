export const PGVECTOR_COLLECTION = "data";
export const PGVECTOR_SCHEMA = "public";
export const PGVECTOR_TABLE = "llamaindex_embeddings";

const REQUIRED_ENV_VARS = ["PG_CONNECTION_STRING"];

export function checkRequiredEnvVars() {
  const missingEnvVars = REQUIRED_ENV_VARS.filter((envVar) => {
    return !process.env[envVar];
  });

  if (missingEnvVars.length > 0) {
    console.log(
      `The following environment variables are required but missing: ${missingEnvVars.join(
        ", ",
      )}`,
    );
    throw new Error(
      `Missing environment variables: ${missingEnvVars.join(", ")}`,
    );
  }
}
