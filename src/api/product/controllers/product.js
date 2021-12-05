"use strict";

/**
 *  product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const entity = await strapi.db.query("api::product.product").findOne({
      where: { slug: "cha-muc" },
      populate: { thumb: true },
    });
    console.log(entity);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
