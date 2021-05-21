import dotenv from "dotenv";
dotenv.config();
let FAUCET_KEY;
export default FAUCET_KEY = {
  mnemonic: [
    "pride",
    "affair",
    "dove",
    "scene",
    "chaos",
    "pool",
    "clinic",
    "hole",
    "domain",
    "axis",
    "swallow",
    "actual",
    "forget",
    "opera",
    "minimum",
  ],
  secret: process.env.SECRET,
  amount: "5213962527",
  pkh: "tz1gjQjwkjFwzDDhQnKkxYF8uh88s5EC8oNg",
  password: process.env.PASSWORD,
  email: process.env.EMAIL,
};
