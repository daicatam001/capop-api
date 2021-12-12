"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { toCurrency } = require("../../../utils/common");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async placeOrder(ctx) {
    const body = ctx.request.body;
    const orderItemIds = [];
    let total = 0;
    for (let item of body.orderItems) {
      total += item.product.price * item.quantity;
      const orderItem = await strapi
        .service("api::order-item.order-item")
        .create({
          data: {
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          },
        });
      orderItemIds.push(orderItem.id);
    }

    const customer = await strapi.service("api::customer.customer").create({
      data: body.customer,
    });
    const order = await strapi.service("api::order.order").create({
      data: {
        order_items: orderItemIds,
        total,
        detail: orderDetail(body.orderItems, body.customer, total),
        customer: customer.id,
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(order, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));

const orderDetail = (orderItems, customer, total) => {
  const orderTemp = orderItems
    .map((item, index) => {
      return `${index + 1}. ${item.product.title}  x ${
        item.quantity
      }\n\tĐơn giá: ${toCurrency(item.product.price)}`;
    })
    .join(`\n`);
  const customerTemp = `Họ tên: ${customer.name}\nSố điện thoại: ${customer.phone}\nĐịa chỉ: ${customer.address}`;
  return `Thông tin đơn hàng\n${orderTemp}\n\nTổng tiền: ${toCurrency(total)}\n\nThông tin khách hàng\n${customerTemp}`;
};
