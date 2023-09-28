const devBaseURL = ""; //开发环境
// const devBaseURL = ""; //开发环境_本地联调
const prodBaseURL = ""; //生产环境
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: prodBaseURL;
export const TIMEOUT = 60000;
