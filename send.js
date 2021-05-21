import dotenv from "dotenv";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import FAUCET_KEY from "./account.js";
dotenv.config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);

  const AMOUNT_TO_SEND = 2;
  const RECIPIENT = "tz1RcXu53hCWKUU36hSG2y4fAaX8VwAfk2ku";

  importKey(
    Tezos,
    FAUCET_KEY.email,
    FAUCET_KEY.password,
    FAUCET_KEY.mnemonic.join(" "),
    FAUCET_KEY.secret
  ).catch((error) => console.error(error, null, 2));

  console.log(`Transfering ${AMOUNT_TO_SEND} ꜩ to ${RECIPIENT}...`);
  Tezos.contract
    .transfer({ to: RECIPIENT, amount: AMOUNT_TO_SEND })
    .then((operation) => {
      console.log(`Waiting for ${operation.hash} to be confirmed...`);
      return operation.confirmation(1).then(() => operation.hash);
    })
    .then((hash) =>
      console.log(
        `Operation injected: https://florence.tzstats.com/${hash} ...`
      )
    )
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
}

main();
