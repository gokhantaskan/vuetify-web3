/* eslint-env node */

module.exports = {
  "*.{ts,js,cjs,mjs,vue,tsx}": ["yarn lint"],
  "*.{json,md,yml}": ["prettier --write"],
};
