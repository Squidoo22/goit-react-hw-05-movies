import slugify from "slugify";

export const makeSlug = (string) =>
  slugify(string, {
    lower: true,
  });

export const getIdFromSlug = (slug) => slug.match(/[a-z0-9]+$/)[0];
