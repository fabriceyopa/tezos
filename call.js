import dotenv from 'dotenv';
import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';
import FAUCET_KEY from './account.js';
dotenv.config();

async function main() {
  const Tezos = new TezosToolkit(process.env.DATAHUB_URL);
  
  // 1. Import the Faucet Key
  importKey(
    Tezos,
    FAUCET_KEY.email,
    FAUCET_KEY.password,
    FAUCET_KEY.mnemonic.join(" "),
    FAUCET_KEY.secret
  ).then(async () => {
    // Replace with deployed contract address :
    return Tezos.contract.at('KT1ECSt8FzxAtHxoxi4xN1JwkKUbBe4TS9kz')
  }).then((contract) => {
    console.log(`Incrementing storage value by 7`);
    return contract.methods.increment(7).send();
  }).then((operation) => {
    console.log(`Awaiting confirmation of ${operation.hash}`);
    return operation.confirmation(3).then(() => operation.hash);
  }).then((hash) => {
    console.log(`Operation injected: https://florence.tzstats.com/${hash}`)
  }).catch((error) => {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`)
  });
}

main();