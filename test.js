var diff = require("jest-diff").diff;

const a = `{ key: "𠮷" }`;
const b = `{ key: "吉" }`;

console.log(
  diff(a, b, {
    expand: false,
  })
);
