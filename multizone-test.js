import * as dotenv from "dotenv";
import WPT from "./lib/WPTService.js";
import { ENVIRONMENTS_CONFIG } from "./config/constants.js";
import { getCurrentDate, getArg } from "./util.js";

dotenv.config();
const description = getArg('-d');
if (!description) {
    throw "Add description with -d cli flag. Eg: yarn test -d 'Test description'"
}

const locationsToTest = [
    {id: "ec2-eu-west-3:Chrome.4G", title: "Paris AWS"}, 
    {id: "ec2-us-east-1:Chrome.4G", title: "Virginia AWS"}, 
    {id: "ec2-us-west-1:Chrome.4G", title: "California AWS"},
    {id: "azure-australia-southeast:Chrome.4G", title: "Australia Azure"},
    {id: "gce-asia-east1:Chrome.4G", title: "Taiwan GCP"},
    {id: "ec2-ap-northeast-2:Chrome.4G", title: "Seoul AWS"},
];

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
    locationsToTest.map(async (location) => {
    const response = await WPTService.runTest({
      config: {
        url: `${feHost}/en/`,
        location: location.id,
        label: `${
          path.replace(/\//g, ".") || "home"
        } - ${CURRENT_ENV} - ${dateString} - ${location.title} - ${description}`,
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
