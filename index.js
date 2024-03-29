import * as dotenv from "dotenv";
import WPT from "./lib/WPTService.js";
import PathsToTest from "./config/paths-to-test.js";
import { ENVIRONMENTS_CONFIG } from "./config/constants.js";
import { getCurrentDate, getArg } from "./util.js";

dotenv.config();

const description = getArg('-d');
if (!description) {
    throw "Add description with -d cli flag. Eg: yarn test -d 'Test description'"
}

const {TSB_AUTH_TOKEN, CURRENT_ENV} = process.env;
if (!CURRENT_ENV) {
  throw "CURRENT_ENV is required in .env file"
}
if (!TSB_AUTH_TOKEN) {
  console.warn( "To simulate a logged in user, add TSB_AUTH_TOKEN to the .env file")
}

const { apiHost, feHost, protocol, tokenCookie } =
  ENVIRONMENTS_CONFIG[CURRENT_ENV];

const WPTService = new WPT();
const dateString = getCurrentDate();

Promise.all(
  PathsToTest.map(async (path) => {
    const response = await WPTService.runTest({
      config: {
        url: `${feHost}/en/${path}`,
        label: `${
          path.replace(/\//g, ".") || "home"
        } - ${CURRENT_ENV} - ${dateString}${
            description ? ` - ${description}` : ""
        }`,
        // block:
        //   "https://www.sandbox.game/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
        pingback:
          "https://2411-2800-a4-17d2-5500-1ded-fa6b-107b-bf88.sa.ngrok.io",
        script: `
      ${
        TSB_AUTH_TOKEN
          ? `setCookie ${protocol}://${feHost} ${tokenCookie}=${TSB_AUTH_TOKEN}
      setCookie ${protocol}://${apiHost} ${tokenCookie}=${TSB_AUTH_TOKEN}
      setCookie ${protocol}://t.sandbox.game ${tokenCookie}=${TSB_AUTH_TOKEN}`
          : ""
      }
      navigate %URL%
      `,
      },
    });
    // console.log("Response", response);
  })
);
