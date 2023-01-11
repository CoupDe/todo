const ENDPOINTS = {
  VERSIONAPI: "v1/",
  BASE: "http://127.0.0.1:8000/",

  AUTHPATH: {
    LOGIN: "auth/login/",
    REFRESH: "auth/token/refresh/",
    LOGOUT: "auth/logout/",
    TOKEN: "auth/token/",
  },
  get baseApi() {
    return this.BASE + "api/" + this.VERSIONAPI;
  },
  TODO: {
    TASKLIST: "tasklist/",
    TASK: "task/",
    COMMENT: "comment/",
  },
};

export default ENDPOINTS;
