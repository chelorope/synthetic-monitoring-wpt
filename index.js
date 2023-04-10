import * as dotenv from "dotenv";
import WPT from "./WPTService.js";
import PathsToTest from "./paths-to-test.js";
import { ENVIRONMENTS_CONFIG } from "./constants.js";

dotenv.config();

const TSB_AUTH_TOKEN = process.env.TSB_AUTH_TOKEN;
const CURRENT_ENV = process.env.CURRENT_ENV || "qa3";
const { apiHost, feHost, protocol, tokenCookie } =
  ENVIRONMENTS_CONFIG[CURRENT_ENV];

const WPTService = new WPT();
const dateString = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const DESCRIPTION = "Lazy Hydrate On";

Promise.all(
  PathsToTest.map(async (path) => {
    const response = await WPTService.runTest({
      config: {
        url: `${feHost}/en/${path}`,
        label: `${
          path.replace(/\//g, ".") || "home"
        } - ${CURRENT_ENV} - ${dateString}${
          DESCRIPTION ? ` - ${DESCRIPTION}` : ""
        }`,
        // block:
        //   "https://www.sandbox.game/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
        pingback:
          "https://2411-2800-a4-17d2-5500-1ded-fa6b-107b-bf88.sa.ngrok.io",
        script: `
      setCookie ${protocol}://${feHost} ${tokenCookie}=${TSB_AUTH_TOKEN}
      setCookie ${protocol}://${apiHost} ${tokenCookie}=${TSB_AUTH_TOKEN}
      setCookie ${protocol}://t.sandbox.game ${tokenCookie}=${TSB_AUTH_TOKEN}
      navigate %URL%
      `,
      },
    });
    // console.log("Response", response);
  })
);
