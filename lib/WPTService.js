import axios from "axios";

import { runDefaultConfig } from "./WPTDefaultConfig.js";
import { WPT_DOMAIN, WPT_PATHS } from "../config/constants.js";

export default class WPT {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: WPT_DOMAIN,
      headers: {
        "accept-encoding": "null",
      },
      params: {
        k: process.env.WEB_PAGE_TEST_API_KEY,
      },
    });
  }

  async runTest({ config }) {
    const runConfig = { ...runDefaultConfig, ...config };
    const response = await this.axiosInstance.get(WPT_PATHS.run, {
      params: runConfig,
    });
    return response.data;
  }

  async checkTestStatus({ testId }) {
    const response = await this.axiosInstance.get(WPT_PATHS.checkStatus, {
      params: { test: testId },
    });
    return response.data;
  }

  async getJsonResults({ testId }) {
    const response = await this.axiosInstance.get(WPT_PATHS.jsonResult, {
      params: { test: testId },
    });
    return response.data;
  }

  async cancelTest({ testId }) {
    const response = await this.axiosInstance.get(WPT_PATHS.cancel, {
      params: { test: testId },
    });
    return response.data;
  }
}
