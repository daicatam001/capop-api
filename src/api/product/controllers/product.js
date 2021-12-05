"use strict";

/**
 *  product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { first } = require('lodash/fp');
module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug, id } = ctx.params;
    const entity = first(await strapi.service("api::product.product").find({ slug }));
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
