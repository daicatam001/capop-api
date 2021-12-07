"use strict";

/**
 *  product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query("api::product.product").findOne({
      where: { slug },
      populate: { thumb: true },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findRelativeBySlug(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query("api::product.product").findMany({
      where: {
        $not: {
          slug,
        },
      },
      populate: { thumb: true },
      start: 0,
      limit: 6,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
