export const WPT_DOMAIN = "https://www.webpagetest.org";

export const WPT_PATHS = Object.freeze({
  run: "/runtest.php",
  checkStatus: "/testStatus.php",
  jsonResult: "/jsonResult.php",
  cancel: "/cancelTest.php",
  locations: "/getLocations.php",
  balance: "/testBalance.php",
});

export const ENVIRONMENTS_CONFIG = Object.freeze({
  local: {
    apiHost: "localhost:8081",
    feHost: "localhost:8080",
    protocol: "http",
    tokenCookie: "tsb_local_token",
  },
  dev2: {
    apiHost: "api-dev2.sandbox.game",
    feHost: "dev2.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_dev2_token",
  },
  qa3: {
    apiHost: "api-qa3.sandbox.game",
    feHost: "qa3.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_qa3_token",
  },
  develop: {
    apiHost: "api-develop.sandbox.game",
    feHost: "develop.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_develop_token",
  },
  demo: {
    apiHost: "api-demo.sandbox.game",
    feHost: "demo.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_demo_token",
  },
  staging: {
    apiHost: "api-staging.sandbox.game",
    feHost: "staging.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_staging_token",
  },
  production: {
    apiHost: "api.sandbox.game",
    feHost: "www.sandbox.game",
    protocol: "https",
    tokenCookie: "tsb_www_token",
  },
});
