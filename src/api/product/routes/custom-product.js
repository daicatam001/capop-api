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
  ],
};
