import axios from "axios";

import { runDefaultConfig } from "./WPTDefaultConfig.js";
import { WPT_DOMAIN, WPT_PATHS } from "./constants.js";

export default class WPT {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: WPT_DOMAIN,
      params: {
        k: process.env.WEB_PAGE_TEST_API_KEY,
      },
    });
  }

  async runTest({ config }) {
    const runConfig = { ...runDefaultConfig, ...config };
    await this.axiosInstance.get(WPT_PATHS.run, { params: runConfig });
  }

  async checkTestStatus({ testId }) {
    this.axiosInstance.get(WPT_PATHS.checkStatus, { params: { test: testId } });
  }

  async getJsonResults({ testId }) {
    this.axiosInstance.get(WPT_PATHS.jsonResult, { params: { test: testId } });
  }

  async cancelTest({ testId }) {
    this.axiosInstance.get(WPT_PATHS.cancel, { params: { test: testId } });
  }
}
