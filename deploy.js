import dotenv from "dotenv";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import FAUCET_KEY from "./account.js";
import CONTRACT_JSON from "./counter.js";
dotenv.config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);

  // 1. Deploy the contract
  importKey(
    Tezos,
    FAUCET_KEY.email,
    FAUCET_KEY.password,
    FAUCET_KEY.mnemonic.join(" "),
    FAUCET_KEY.secret
  )
    .then(async () => {
      return Tezos.contract.originate({
        code: CONTRACT_JSON(),
        storage: 0,
      });
    })
    .then((operation) => {
      return operation.contract();
    })
    .then((contract) => {
      console.log(`Deployed at: ${contract.address}`);
    })
    .catch((error) => {
      console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    });
}

main();
