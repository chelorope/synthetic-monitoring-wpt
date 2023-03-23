import * as dotenv from "dotenv";
import WPT from "./WPTService.js";

dotenv.config();
// Cookie: tsb_www_token
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiOTlmNTQ3ZGMtZmUwYS00ZGEyLWI3ZTQtZTgzZmUzZjA0OWRkIiwiYWNjZXNzTGV2ZWwiOiJtYXJrZXRwbGFjZSIsImxvZ2luVHlwZSI6ImJ1aWx0aW4iLCJ3YWxsZXRBZGRyZXNzIjoiMHg5ZjlmNTI0NWM4ZmNlY2QwNDdkNWJhMzE0YjJjZmY1MmIzMmY4NWI1In0sImlhdCI6MTY3ODgyNTIxOCwiZXhwIjoxNjgxNDE3MjE4fQ.b01Cx4kVcUt9naKMEbsj5JioM_U6INFf9G1rSgeBJ58'
const WPTService = new WPT();
const dateString = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const homePaths = [
  // Home
  "",
]
const seasonPaths = [
  // Season
  // "season/",
  // "season/contests/",
  // "season/contests/february-festival/",
  // "season/changelog/",
  "events/",
  "events/march-festival/",
  "events/march-festival/play/"
]
const mapPaths = [
  // Map
  "map/",
]
const marketPaths = [
  // Market
  "assets/monowheel/0ca92f52-d693-4fbd-82eb-df1c7db3c4d9/",
  "avatars/",
  "avatars/octohedz-vx/206/",
  "collections/",
  "collections/parisland/200/",
  "nft-lands/",
  "nft/",
  "shop/",
]
const blogPaths = [
  // Blog
  "blog/",
  "blog/1000-sports-land-nfts-sold-in-less-than-24-hours/3279/",
]
const userPaths = [
  // User
  "me/avatar/",
  "me/badges/",
  "me/bridge/",
  "me/claim/",
  "me/defi/",
  "me/edit/",
  "me/inventory/?sections=0",
  "me/migration/",
  "me/profile/",
  "me/referral/",
  "me/settings/",
  "me/settings/account-verification",
  "me/settings/chain",
  "me/settings/security",
]
const createPaths = [
  // Create
  "create/game-maker/",
  "create/vox-edit/",
]
const aboutPaths = [
  // About
  "about/",
  "about/land/",
  "about/sand/",
]
const landsalePaths = [
  // // Landsale
  // "landsale/"
];
const agenciesPaths = [
  // Agencies
  "agencies/",
  "agencies/directory/",
  "agencies/directory/4018211895",
  "partnerships/",
];
const cartPaths = [
  // cart
  "cart/"
];

const pathsToTest = [
  ...homePaths,
  ...seasonPaths,
  ...mapPaths,
  ...marketPaths,
  ...blogPaths,
  ...userPaths,
  ...createPaths,
  ...aboutPaths,
  ...landsalePaths,
  ...cartPaths,
  ...agenciesPaths
]

const DESCRIPTION = ''

pathsToTest.forEach((path) => {
  WPTService.runTest({
    config: {
      url: `www.sandbox.game/en/${path}`,
      label: `${path.replace(/\//g, '.') || "home"} - Prod - ${dateString}${DESCRIPTION ? ` - ${DESCRIPTION}` : ''}`,
      // block:
      //   "https://www.sandbox.game/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
      pingback:
        "https://2411-2800-a4-17d2-5500-1ded-fa6b-107b-bf88.sa.ngrok.io",
      script: `
      setCookie https://www.sandbox.game tsb_www_token=${AUTH_TOKEN}
      setCookie https://api.sandbox.game tsb_www_token=${AUTH_TOKEN}
      setCookie https://t.sandbox.game tsb_www_token=${AUTH_TOKEN}
      navigate %URL%
      `,
    },
  });
});
