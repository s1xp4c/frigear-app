import {createMain} from "citty";
import stripe from "./stripe";
import {configDotenv} from "dotenv";

import {name, version} from "./../package.json";

const main = createMain({
  meta: {
    description: `${name} CLI.`,
    version,
  },
  async setup() {
    configDotenv();
  },
  subCommands: {
    stripe,
  },
});

main().catch(console.error);
