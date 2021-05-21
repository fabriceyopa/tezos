import dotenv from "dotenv";
import { TezosToolkit } from "@taquito/taquito";

dotenv.config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);

  // 1. use getBalance for a particular account
  Tezos.tz
    .getBalance(process.env.BAKER_ADDRESS)
    .then((balance) => {
      console.log(`Balance is ${balance.toNumber() / 1000000} ꜩ`);
    })
    .catch((error) => console.log(JSON.stringify(error)));
}

main();
