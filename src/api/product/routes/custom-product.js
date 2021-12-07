module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products/slug/:slug",
      handler: "product.findOneBySlug",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/products/slug/:slug/relative",
      handler: "product.findRelativeBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
