/* eslint-env node */

module.exports = {
  "*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}": ["yarn lint"],
  "*.{json,md,yml}": ["prettier --write"],
};
