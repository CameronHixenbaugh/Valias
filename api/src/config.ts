const flowAccountErrorMessaage = `

No Flow account configured.

Did you export FLOW_ADDRESS and FLOW_PRIVATE_KEY?

`;

const defaultPort = 3000;
const defaultMigrationPath = "./src/migrations";

export function getConfig(env) {
  env = env ?? process.env;

  const port = env.PORT || defaultPort;

  const accessApi = env.FLOW_ACCESS_API_URL;

  const minterAddress = env.MINTER_ADDRESS!;
  const minterPrivateKeyHex = env.MINTER_PRIVATE_KEY!;

  if (!env.MINTER_ADDRESS || !env.MINTER_PRIVATE_KEY) {
    throw flowAccountErrorMessaage;
  }

  const minterAccountKeyIndex = env.MINTER_ACCOUNT_KEY_INDEX || 0;

  const fungibleTokenAddress = env.FUNGIBLE_TOKEN_ADDRESS!;

  const nonFungibleTokenAddress = env.NON_FUNGIBLE_TOKEN_ADDRESS!;

  const databaseUrl = env.DATABASE_URL!;

  const databaseMigrationPath =
    process.env.MIGRATION_PATH || defaultMigrationPath;

  const pinataApiKey = env.PINATA_API_KEY

  const pinataSecretApiKey = env.PINATA_SECRET_API_KEY

  return {
    port,
    accessApi,
    minterAddress,
    minterPrivateKeyHex,
    minterAccountKeyIndex,
    fungibleTokenAddress,
    nonFungibleTokenAddress,
    databaseUrl,
    databaseMigrationPath,
    pinataApiKey,
    pinataSecretApiKey
  };
}