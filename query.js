import dotenv from "dotenv";
import { RpcClient } from "@taquito/rpc";

dotenv.config();

async function main() {
  const client = new RpcClient(process.env.DATAHUB_URL);

  // 1. Get chain constants
  await client
    .getConstants()
    .then((data) => {
      console.log("-- Constants: ", data);
    })
    .catch((err) => console.log(err));

  // 2. Get information about the latest block
  await client
    .getBlock()
    .then((data) => {
      console.log("-- Chain ID: ", data.chain_id);
      console.log("-- Head block: ", data);
    })
    .catch((error) => console.log(JSON.stringify(error, null, 2)));

  // 3. Get the Baker that an account has delegated to
  await client
    .getDelegate(process.env.BAKER_ADDRESS)
    .then((data) => {
      console.log("-- Delegate: ", data);
    })
    .catch((error) => console.log(JSON.stringify(error, null, 2)));

  // 4. Get information about a Baker
  await client
    .getDelegates(process.env.BAKER_ADDRESS)
    .then((data) => {
      console.log("-- Baker info: ", data);
    })
    .catch((error) => console.log(JSON.stringify(error, null, 2)));
}
main();
