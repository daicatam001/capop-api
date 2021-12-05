const { defaultsDeep, merge } = require("lodash/fp");
const helmet = require("koa-helmet");

const defaults = {
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  originAgentCluster: false,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "https:"],
      "img-src": ["'self'", "data:", "blob:"],
      "media-src": ["'self'", "data:", "blob:"],
      upgradeInsecureRequests: null,
    },
  },
  xssFilter: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
  frameguard: {
    action: "sameorigin",
  },
};

module.exports = (config) => (ctx, next) => {
  let helmetConfig = defaultsDeep(defaults, config);

  helmetConfig = merge(helmetConfig, {
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        "img-src": [
          "*",
          "'self'",
          "data:",
          "cdn.jsdelivr.net",
          "strapi.io",
          "https:",
        ],
      },
    },
  });
  return helmet(helmetConfig)(ctx, next);
};
