module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/place-order",
      handler: "order.placeOrder",
      config: {
        auth: false,
      },
    },
  ],
};
