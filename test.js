import * as dotenv from "dotenv";
import WPT from "./WPTService.js";

dotenv.config();
const WPTService = new WPT();

const pathsToTest = [
  "",
  "season/",
  "season/contests/",
  "season/rewards/",
  "season/leaderboard/",
  "season/changelog/",
  "beta-map/",
  "shop/",
  "collections/",
  "nft/",
  "create/game-maker/",
  "blog/",
  "blog/1000-sports-land-nfts-sold-in-less-than-24-hours/3279/",
];

pathsToTest.forEach((path) => {
  WPTService.runTest({
    config: {
      url: `www.sandbox.game/en/${path}`,
      label: `${path || "home"} - Prod - Nov 29 - Optimizations #11907`,
      // block:
      //   "https://www.sandbox.game/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
      pingback:
        "https://ca2d-2800-a4-17f6-6600-c53f-4b41-becd-b3eb.sa.ngrok.io",
    },
  });
});
