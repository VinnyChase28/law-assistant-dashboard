module.exports = {
  siteUrl: "https://lawassistant.ai",
  generateRobotsTxt: true,
  exclude: ["/dashboard*", "/auth*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/auth"],
      },
    ],
  },
};
